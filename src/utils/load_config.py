"""
    utils/load_config.py

    This module contains utility functions for loading configurations
    for IngestAI from a YAML file.
"""

import yaml
from typing import Any, Dict

def load_yaml(file_path: str = "config.yaml") -> Dict[str, Any]:
    """
    Load a YAML file and return its contents as a dictionary.
    
    Args:
        file_path (str): Path to the YAML file.
    
    Returns:
        dict: Parsed YAML content.
    """
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)

_config_cache = load_yaml()

def get_config_section(section: str, subsection: str = None) -> Dict[str, Any]:
    """
    Retrieve a specific section or subsection from the config.

    Args:
        section (str): Top-level key in the YAML.
        subsection (str, optional): Nested key under the section.

    Returns:
        dict: Requested config section.

    Raises:
        ValueError: If section or subsection is not found.
    """
    section_data = _config_cache.get(section)
    if section_data is None:
        raise ValueError(f"'{section}' section not found in the configuration.")

    if subsection:
        sub_data = section_data.get(subsection)
        if sub_data is None:
            raise ValueError(f"'{subsection}' subsection not found under '{section}' in the configuration.")
        return sub_data

    return section_data

# Specific accessors
def load_llm_config() -> Dict[str, Any]:
    return get_config_section("llm")

def load_embedder_config() -> Dict[str, Any]:
    return get_config_section("embedder")

def load_milvus_config() -> Dict[str, Any]:
    return get_config_section("storage", "milvus")
