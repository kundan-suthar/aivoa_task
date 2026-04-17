
from langchain_core.tools import tool
from app.agents.interact_agent.schemas import InteractionExtraction


@tool
def log_interaction(extracted: dict) -> dict:
    """
    Receives structured extracted data from LLM and returns it
    as a formatted response to show the user for confirmation.
    """
    return {
        "action": "log",
        "data": extracted,
        "message": "Here is what I captured. Please review and confirm."
    }