# 🤖 IngestAI – Chat with Your Documents

**IngestAI** is a Retrieval-Augmented Generation (RAG) application that lets users upload documents (PDF, DOCX, CSV, TXT) and ask natural language questions about them. It uses **semantic search** powered by vector embeddings stored in **Milvus Cloud**, and generates context-aware answers using **Phi-3 Mini 128K Instruct**.

---

## 🧠 Features

- 📄 Upload documents: `.pdf`, `.docx`, `.csv`, `.txt`
- 🔗 Split documents into overlapping chunks (512 tokens with 50-token overlap)
- 🧬 Generate embeddings using [`BAAI/llm-embedder`](https://huggingface.co/BAAI/llm-embedder)
- 💾 Store vectors in **Milvus Cloud**
- 🔍 Perform semantic search to retrieve top 5 relevant chunks
- 🤖 Generate responses using **Phi-3 Mini 128K Instruct**
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
```

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

> **Note:** Make sure to have at least **10 GB RAM GPU** available.