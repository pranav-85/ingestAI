"""
    utils/preprocessing.py
    
    Contains funcitions for preprocessing text data.
"""
import re
import sys
import os
import json
# Add src to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

import torch
import torch.nn.functional as F
from typing import List, Tuple
from transformers import AutoTokenizer, AutoModelForCausalLM
from src.utils.load_config import load_embedder_config

#Load embedding model configuration
embedding_config = load_embedder_config()
embedding_model_name = embedding_config["provider"] + "/" + embedding_config["model"]
dim = embedding_config["dimension"]

#Load the model
embedding_model = AutoModelForCausalLM.from_pretrained(embedding_model_name, trust_remote_code=True)

embedding_tokenizer = AutoTokenizer.from_pretrained(embedding_model_name, trust_remote_code=True)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

embedding_model.to(device)

# Set the model to evaluation mode
embedding_model.eval()

def chunk_text(text: str, chunk_size: int = 256, overlap: int = 50) -> List[str]:
    """
    Splits the text into chunks of specified size with a given overlap.
    
    Args:
        text (str): The text to be chunked.
        chunk_size (int): The size of each chunk.
        overlap (int): The number of overlapping characters between chunks.
    
    Returns:
        list: A list of text chunks.
    """
    chunks = []
    start = 0
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return chunks

def text_to_embeddings(chunks: List[str]) -> List[List[float]]:
    """
    Converts chunks to embeddings using a pre-trained model.
    
    Args:
        text (str): The text to be converted.
    
    Returns:
        list(list): A list of embeddings.
    """
    
    inputs = embedding_tokenizer(
        chunks,
        padding=True,
        truncation=True,
        return_tensors="pt",
        max_length=512
    ).to(device)

    with torch.no_grad():
        outputs = embedding_model(**inputs, output_hidden_states=True)
        hidden_states = outputs.hidden_states[-1]

    # Attention-aware mean pooling
    attention_mask = inputs['attention_mask'].unsqueeze(-1).expand(hidden_states.size())
    masked_hidden = hidden_states * attention_mask
    summed = masked_hidden.sum(dim=1)
    counts = attention_mask.sum(dim=1)
    mean_pooled = summed / counts

    # Normalize embeddings (recommended for cosine similarity)
    normalized_embeddings = F.normalize(mean_pooled, p=2, dim=1)

    print("Embedding shape:", len(normalized_embeddings), "x", len(normalized_embeddings[0]))
    
    return normalized_embeddings.cpu().numpy().tolist()

def preprocess(text: str, chunk_size: int = 400, overlap: int = 50):
    """
    Preprocess the text by chunking and converting to embeddings.
    
    Args:
        text (str): The text to be preprocessed.
        chunk_size (int): The size of each chunk.
        overlap (int): The number of overlapping characters between chunks.
    
    Returns:
        list: A list of tuples containing chunked text and its embeddings.
    """
    chunks = chunk_text(text, chunk_size, overlap)
    embeddings = text_to_embeddings(chunks)

    return (chunks, embeddings)

def clean_response(response: str) -> str:
    """
    Cleans the response by extracting text after 'Answer:'.

    Args:
        response (str): The response to be cleaned.

    Returns:
        str: The cleaned response.
    """
    try:
        responses =  re.findall(r"\{[^{}]*\}", response, re.DOTALL)

        data = json.loads(responses[1])
        print(data)
        return data.get("answer", "")
    
    except json.JSONDecodeError:
        print("Failed to parse final answer.")
        return ""