# agent/nodes.py
from app.agents.interact_agent.tools import edit_interaction
from app.agents.interact_agent.schemas import EditExtraction
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, SystemMessage
from app.agents.interact_agent.state import AgentState
from app.agents.interact_agent.schemas import InteractionExtraction
from app.agents.interact_agent.tools import log_interaction
import dotenv
import os
from datetime import datetime
dotenv.load_dotenv()

llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.getenv("GROQ_API_KEY"), temperature=0)

structured_llm = llm.with_structured_output(InteractionExtraction, include_raw=False)
edit_structured_llm = llm.with_structured_output(EditExtraction, include_raw=False)

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
    today_date = datetime.now().strftime("%Y-%m-%d")
    result: InteractionExtraction = structured_llm.invoke([
        SystemMessage(content=f"""Extract HCP interaction details from the user message.
            Only fill fields that are explicitly or clearly implied in the message.
            Leave everything else as null. Never guess. Today's date is {today_date} .
            Use this as reference for relative dates like "today", "tomorrow", or "next week" if mentioned"""),
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



# ── Node 4: extract_edit_delta ─────────────────────────────────────────────────
def extract_edit_delta_node(state: AgentState) -> AgentState:
    """
    Uses EditExtraction schema — extracts ONLY the fields the user
    wants to change. Everything else stays None so the merge is clean.
    """
    result: EditExtraction = edit_structured_llm.invoke([
        SystemMessage(content="""The user wants to correct or update part of a previously logged HCP interaction.
Extract ONLY the fields they are changing.
Leave every other field as null — do not re-extract things they did not mention.
Never guess."""),
        HumanMessage(content=state["raw_input"]),
    ])
    return {**state, "edit_delta": result.model_dump()}


# ── Node 5: run_edit_tool ──────────────────────────────────────────────────────
def run_edit_tool_node(state: AgentState) -> AgentState:
    """
    Calls edit_interaction tool with current data + delta.
    Merges only changed fields, leaves the rest untouched.
    """
    tool_response = edit_interaction.invoke({
        "current_data": state["structured_data"] or {},
        "edit_delta":   state["edit_delta"] or {},
    })

    # Update structured_data in state so future edits build on latest version
    return {
        **state,
        "structured_data": tool_response["updated_data"],
        "tool_response":   tool_response,
    }