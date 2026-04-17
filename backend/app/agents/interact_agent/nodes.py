# agent/nodes.py
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from app.agents.interact_agent.state import AgentState
from app.agents.interact_agent.schemas import InteractionExtraction
from app.agents.interact_agent.tools import log_interaction
import dotenv
import os
dotenv.load_dotenv()

llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.getenv("GROQ_API_KEY"), temperature=0)

structured_llm = llm.with_structured_output(InteractionExtraction, include_raw=False)


# ── Node 1: detect_intent ──────────────────────────────────────────────────────
def detect_intent_node(state: AgentState) -> AgentState:
    """
    Simple LLM call to classify user intent.
    Returns: "log" | "edit" | "followup"
    """
    prompt = f"""Classify the user's intent into exactly one word.
    
Options:
- log       → user is describing a new HCP interaction
- edit      → user is correcting or updating a previously mentioned detail
- followup  → user is specifying a follow-up action or date

User message: "{state['raw_input']}"

Reply with only the single word."""

    response = llm.invoke([HumanMessage(content=prompt)])
    intent = response.content.strip().lower()

    # Fallback if LLM returns something unexpected
    if intent not in ("log", "edit", "followup"):
        intent = "log"

    return {**state, "intent": intent}


# ── Node 2: extract_structured_data ───────────────────────────────────────────
def extract_structured_data_node(state: AgentState) -> AgentState:
    """
    Calls Groq LLM with structured output to extract interaction fields.
    Partial extraction is valid — user is chatting, not filling a form.
    """
    result: InteractionExtraction = structured_llm.invoke([
        SystemMessage(content="""Extract HCP interaction details from the user message.
Only fill fields that are explicitly or clearly implied in the message.
Leave everything else as null. Never guess."""),
        HumanMessage(content=state["raw_input"]),
    ])

    return {**state, "structured_data": result.model_dump()}


# ── Node 3: run_log_tool ───────────────────────────────────────────────────────
def run_log_tool_node(state: AgentState) -> AgentState:
    """
    Calls the log_interaction tool with extracted data.
    Tool formats the response to send back to the user.
    """
    tool_response = log_interaction.invoke({"extracted": state["structured_data"]})
    return {**state, "tool_response": tool_response}