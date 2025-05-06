# CUDA 12.8 + Ubuntu 22.04 base image
FROM nvidia/cuda:12.8.0-runtime-ubuntu22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    git \
    curl \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Set python alias
RUN ln -s /usr/bin/python3 /usr/bin/python

# Copy requirements
COPY requirements.txt .

# Upgrade pip and install torch 2.7.0+cu128
RUN pip install --upgrade pip \
 && pip install torch==2.7.0+cu128 --index-url https://download.pytorch.org/whl/cu128 \
 && pip install -r requirements.txt

# Copy project files
COPY . /app
WORKDIR /app

# Expose Streamlit default port
EXPOSE 8501

# Run Streamlit app
CMD ["streamlit", "run", "src/main/app.py", "--server.port=8501", "--server.enableCORS=false"]
