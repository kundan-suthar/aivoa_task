# agent/graph.py
from langgraph.graph import StateGraph, END
from app.agents.interact_agent.state import AgentState
from app.agents.interact_agent.nodes import (
    detect_intent_node,
    extract_structured_data_node,
    run_log_tool_node,
)


def route_by_intent(state: AgentState) -> str:
    """
    Conditional edge — routes to the right tool node based on intent.
    Only 'log' is wired for now. Others go to END as placeholder.
    """
    intent = state.get("intent", "log")

    if intent == "log":
        return "extract_and_log"

    # Placeholders — will wire edit and followup tools next
    return "end"


def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("detect_intent",          detect_intent_node)
    graph.add_node("extract_structured_data", extract_structured_data_node)
    graph.add_node("run_log_tool",            run_log_tool_node)

    graph.set_entry_point("detect_intent")

    # Conditional routing after intent detection
    graph.add_conditional_edges(
        "detect_intent",
        route_by_intent,
        {
            "extract_and_log": "extract_structured_data",
            "end":              END,
        }
    )

    # After extraction → always run log tool (for now)
    graph.add_edge("extract_structured_data", "run_log_tool")
    graph.add_edge("run_log_tool",            END)

    return graph.compile()


hcp_agent = build_graph()