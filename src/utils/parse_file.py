"""
    utils/parse_file.py

    This module contains utility functions for parsing different file formats
    from in-memory uploaded file objects.
"""

import fitz 
from docx import Document
import pandas as pd
import json
from typing import IO

def parse_pdf(uploaded_file: IO[bytes]) -> str:
    """Extract text from an in-memory PDF file."""
    try:
        doc = fitz.open(stream=uploaded_file.read(), filetype="pdf")
        return "\n".join(page.get_text() for page in doc)
    except Exception as e:
        raise ValueError(f"[PDF] Error parsing uploaded file: {e}")

def parse_docx(uploaded_file: IO[bytes]) -> str:
    """Extract text from an in-memory DOCX file."""
    try:
        doc = Document(uploaded_file)
        return "\n".join(para.text for para in doc.paragraphs)
    except Exception as e:
        raise ValueError(f"[DOCX] Error parsing uploaded file: {e}")

def parse_text(uploaded_file: IO[bytes], encoding: str = "utf-8") -> str:
    """Read text from an in-memory TXT file."""
    try:
        return uploaded_file.read().decode(encoding)
    except Exception as e:
        raise ValueError(f"[TXT] Error parsing uploaded file: {e}")

def parse_csv(uploaded_file: IO[bytes], encoding: str = "utf-8") -> str:
    """Convert an in-memory CSV file to a readable string."""
    try:
        df = pd.read_csv(uploaded_file, encoding=encoding)
        return df.to_string(index=False)
    except Exception as e:
        raise ValueError(f"[CSV] Error parsing uploaded file: {e}")

def parse_json(uploaded_file: IO[bytes], encoding: str = "utf-8") -> str:
    """Pretty-print JSON content from an in-memory file."""
    try:
        data = json.load(uploaded_file)
        return json.dumps(data, indent=4)
    except Exception as e:
        raise ValueError(f"[JSON] Error parsing uploaded file: {e}")


def parse_file(uploaded_file: IO[bytes], filename: str) -> str:
    """
    Dispatch the parsing to the appropriate function based on filename extension.
    
    Args:
        uploaded_file (IO[bytes]): The in-memory file-like object.
        filename (str): The original filename (used for extension).
    
    Returns:
        str: Extracted file content.
    """
    file_parsers = {
        ".pdf": parse_pdf,
        ".docx": parse_docx,
        ".txt": parse_text,
        ".csv": parse_csv,
        ".json": parse_json,
    }

    for ext, parser in file_parsers.items():
        if filename.lower().endswith(ext):
            uploaded_file.seek(0)
            return parser(uploaded_file)

    raise ValueError(f"Unsupported file format for: '{filename}'")