"""
    db_handler.py
    This file contains all the functions need for uploading files and retrieving chunks
    from milvus database.

    Collection schema:
        primary_key: VARCHAR(64)
        vector: FLOAT_VECTOR(768)
        text: VARCHAR(20,000)
        metadata: VARCHAR(1024)
    
    Cluster Name: Pranav_db
    Collection Name: IngestAI
"""
import os
import requests
import json
from typing import IO, List
from dotenv import load_dotenv
from src.utils.preprocessing import preprocess, text_to_embeddings
from src.utils.load_config import load_milvus_config
from src.utils.parse_file import parse_file

load_dotenv()

_config_cache = load_milvus_config()

url = os.getenv("API_URL")
headers = {
    "Authorization": f"Bearer {os.getenv('API_BEARER_TOKEN')}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

def upload_file(uploaded_file: IO[bytes]) -> bool:
    """
    Uploads a file to the Milvus database after parsing and chunking it.
    Args:
        uploaded_file (IO[bytes]): The in-memory file-like object.
    Returns:
        bool: True if the upload was successful, False otherwise.
    """
    if uploaded_file is None:
        raise ValueError("No file uploaded.")
        return False
    
    text = parse_file(uploaded_file, uploaded_file.name)
    chunks, embeddings = preprocess(text)

    
    for i in range(len(chunks)):
        pk = uploaded_file.name + "-" + str(i)
        filename = uploaded_file.name
    
        payload = {
            "collectionName": f"{_config_cache['collection']}",
            "data": [
                {
                    "primary_key": pk,
                    "text": chunks[i],
                    "filename": filename,
                    "vector": embeddings[i],
                    "metadata": filename
                }
            ]
        }

        response = requests.post(url + 'insert', data=json.dumps(payload), headers=headers)
        
        print(response.json())
        if response.status_code == 200:
            print(f"File {filename} uploaded successfully.")
        else:
            print(f"Failed to upload file {filename}. Status code: {response.status_code}")
            return False
        
    return True

def retrieve_chunks(query: str, top_k: int = 5) -> List[str]:
    """
    Retrieves the top K chunks from the Milvus database based on a query.
    
    Args:
        query (str): The query string to search for.
        top_k (int): The number of top results to retrieve.
    
    Returns:
        list: A list of retrieved chunks.
    """
    embeddings = text_to_embeddings(query)
    payload = {
        "collectionName": f"{_config_cache['collection']}",
        "data": [embeddings[0]],
        "limit": top_k,
        "outputFields": ["primary_key", "text", "filename", "metadata"],
        "searchParams": {
            "metric_type": "IP",
            "params": {
                "nprobe": 10
            }
        }
    }
    
    response = requests.post(url + 'search', headers=headers, data=json.dumps(payload))

    print(response.json())

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to retrieve chunks. Status code: {response.status_code}")
        return []