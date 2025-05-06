# 🤖 IngestAI – Chat with Your Documents

**IngestAI** is a Retrieval-Augmented Generation (RAG) application that enables users to upload and query multiple document types (`PDF`, `DOCX`, `CSV`, `TXT`) through natural language. It supports context-aware Q&A across **multiple documents at once**, making it ideal for deep information retrieval, analysis, and exploration.

Unlike many document Q&A tools that rely on simple keyword-based search or limit responses to a single document, **IngestAI** implements a **generalized RAG system** that:

- Uses **semantic vector search** to find the most relevant information, regardless of format or source
- Retrieves top matching text chunks across **all uploaded documents**, not just one
- Provides coherent, grounded responses using the **Phi-3 Mini 128K Instruct** model in a **4-bit quantized** form for fast, memory-efficient inference
- Stores and manages vector embeddings efficiently using **Milvus Cloud**

This architecture allows IngestAI to scale across various use cases — from document search and knowledge base assistants to research tools and internal Q&A bots — while maintaining fast response times and high contextual relevance.

---

## 🧠 Features

- 📄 Upload documents: `.pdf`, `.docx`, `.csv`, `.txt`
- 🔗 Split documents into overlapping chunks (512 tokens with 50-token overlap)
- 🧬 Generate embeddings using [`BAAI/llm-embedder`](https://huggingface.co/BAAI/llm-embedder)
- 💾 Store vectors in **Milvus Cloud**
- 🔍 Perform semantic search to retrieve top 5 relevant chunks
- 🤖 Generate responses using **Phi-3 Mini 128K Instruct (4-bit quantized)**
- 🎛️ Interactive UI via **Streamlit**

---

## 📊 Pipeline Overview

1. **Document Upload**
   - User uploads a supported file type.
   - File is parsed and chunked into segments of 512 tokens (with 50-token overlap).

2. **Embedding & Storage**
   - Chunks are embedded using `BAAI/llm-embedder`.
   - Vectors are stored in **Milvus Cloud**.

3. **Question Answering**
   - User submits a query.
   - The query is embedded and matched semantically to the stored vectors.
   - Top 5 chunks are retrieved and passed as context to **Phi-3 Mini 128K Instruct**.
   - An answer is generated and displayed.

---

## 📁 Supported File Types

- `.pdf`
- `.docx`
- `.csv`
- `.txt`

---

## 🛠️ Tech Stack

| Component        | Technology                      |
|------------------|----------------------------------|
| Frontend         | Streamlit                        |
| Embedding Model  | `BAAI/llm-embedder`              |
| Vector DB        | Milvus (via Zilliz Cloud)        |
| LLM              | Phi-3 Mini 128K Instruct         |
| Chunking Logic   | Custom (512 tokens, 50 overlap)  |
| Deployment       | **Pending** (planned: GCP Cloud Run) |

---

## Setup (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ingestAI.git
cd ingestAI
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
pip install torch --index-url https://download.pytorch.org/whl/cu128
```
> **Note:** Change the `torch` installation command based on your **CUDA version**.

### 3. Setup Zilliz Cloud Database
Create a ccollection with the following schema:
```sql
primary_key: VARCHAR(64)
vector: FLOAT_VECTOR(768)
text: VARCHAR(20,000)
metadata: VARCHAR(1024)
```
Note: Make sure to change the collection and cluster name in `config.yaml`.

### 4. Configure environment variables

Create a .env file in the root directory of the project in the following format
```env
API_URL=<URL_HERE>
API_BEARER_TOKEN=<API_TOKEN_HERE>
```

### 5. Run the app (from root dir)
```bash
streamlit run sr/main/app.py
```

> **Note:** Make sure to have at least **4 GB RAM GPU** available.
