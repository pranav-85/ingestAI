"""
    prompt_templates.py

    This module contains various prompt templates for different tasks.
"""
import sys
import os

# Add src to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

import re
from src.utils.model_runner import generate_response

def finetune_prompt(query: str) -> str:
    """
    Finetune the user query for vector database search.
    Args:
        query (str): The user query to be optimized.
    Returns:
        str: The optimized query for vector database search.
    """
    PROMPT_TEMPLATE = """
        You are a vector database search expert. Convert the following user query into a concise,
        well-formed query that can be used to search a vector database. Avoid uncessary details and focus on the core
        information needed for the search. Your output must include the optimized query wrapped between 
        <|startquery|> and <|endquery|>.

        User Query: {query}


        Format:
        <|startquery|> optimzed search query here<|endquery|>
    """

    prompt = PROMPT_TEMPLATE.format(query=query)
    response = generate_response(prompt, max_new_tokens=140)
    print(f"Response: {response}")
    return re.findall(r"<\|startquery\|>(.*?)<\|endquery\|>", response, re.DOTALL)[-1]

def search_prompt(query: str, context: str) -> str:
    """
    Search the vector database using the optimized query and .
    Args:
        query (str): The optimized query for vector database search.
    Returns:
        str: The search results from the vector database.
    """
    PROMPT_TEMPLATE = """
        You are a knowledgable assistant helping users with questions based on provided documents.
        Use only the context provided to answer the user's question. Your response should be concise and relevant.
        Summarize the output in 150 to 200 words.

        Context: {context}

        User Question: {query}

        Answer:
    """

    prompt = PROMPT_TEMPLATE.format(query=query, context=context)
    
    return prompt