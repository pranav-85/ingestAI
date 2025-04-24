"""
    utils/model_runner.py
    
    This module contains functions to load and run a pre-trained model.
"""
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
from src.utils.load_config import load_llm_config

model_config = load_llm_config()
llm_model_name = model_config["provider"] + "/" + model_config["model"]

llm_tokenizer = AutoTokenizer.from_pretrained(llm_model_name, trust_remote_code=True)
llm_tokenizer.pad_token = llm_tokenizer.eos_token
llm_tokenizer.padding_side = "right"

llm_model = AutoModelForCausalLM.from_pretrained(llm_model_name, trust_remote_code=True)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
llm_model.to(device)

llm_model.eval()

def generate_response(prompt: str) -> str:
    """
    Generate an answer using a pre-trained model.
    
    Args:
        prompt (str): The input prompt for the model.
    
    Returns:
        str: The generated answer.
    """
    inputs = llm_tokenizer(prompt, return_tensors="pt").to(llm_model.device)

    outputs = llm_model.generate(**inputs, max_new_tokens=model_config["max_new_tokens"], do_sample=True, temperature=model_config["temperature"])

    decoded = llm_tokenizer.decode(outputs[0], skip_special_tokens=True)

    return decoded