import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from fastapi import FastAPI, UploadFile, File
from typing import IO
import asyncio

from src.database.db_handler import upload_file
from src.pipeline.ingest_pipeline import IngestPipeline

app = FastAPI()

class NamedFileWrapper:
    def __init__(self, file: IO[bytes], name: str):
        self.file = file
        self.name = name

    def read(self, *args, **kwargs):
        return self.file.read(*args, **kwargs)

    def __getattr__(self, item):
        return getattr(self.file, item)
    
@app.get("/")
async def root():
    return {"message": "Connection successful!"}\
    
@app.post("/upload")
async def upload_file_to_db(file: UploadFile = File(...)):
    """
    Endpoint to upload file to the milvus vector DB.
    
    Args:
        file (bytes): The file to be uploaded.

    Returns:
        dict: A message indicating the success of the upload.
    """

    wrapped_file = NamedFileWrapper(file.file, file.filename)
    response = await asyncio.to_thread(upload_file, wrapped_file)
    if response:
        return {"message": "File uploaded successfully!"}
    else:
        return {"message": "File upload failed."}

@app.post("/chat")
async def chat(query: str):
    """
    Endpoint to generate a response based on the user's query.
    
    Args:
        query (str): The user's query.
    
    Returns:
        dict: A message containing the generated response.
    """

    pipeline = IngestPipeline()
    response = await asyncio.to_thread(pipeline.run, query)
    
    return {"response": response}