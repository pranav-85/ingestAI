import sys
import os

# Add src to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

import streamlit as st
from src.pipeline.ingest_pipeline import IngestPipeline
from src.database.db_handler import upload_file

st.set_page_config(page_title="IngestAI", page_icon=":robot_face:", layout="wide")
st.title("IngestAI :robot_face:")


tab1, tab2 = st.tabs(["Upload", "Chat"])

pipeline = IngestPipeline()

with tab1:
    uploaded_file = st.file_uploader("Upload a file", type=["txt", "pdf", "docx", "csv"], label_visibility="visible")
    if uploaded_file is not None:
        if st.button("Upload"):
            if upload_file(uploaded_file):
                st.success("File uploaded successfully!")
            else:
                st.error("File upload failed.")
        
with tab2:
    query = st.text_input("Ask a question:")
    if st.button("Submit"):
        if query:
            response = pipeline.run(query)
            st.write(response)  
        else:
            st.error("Please enter a question.")
