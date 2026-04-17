# agent/runner.py
from langchain_core.messages import HumanMessage
from app.agents.interact_agent.graph import hcp_agent
from app.agents.interact_agent.state import AgentState


async def run_agent(user_message: str) -> dict:
    initial_state: AgentState = {
        "messages":       [HumanMessage(content=user_message)],
        "raw_input":      user_message,
        "intent":         None,
        "structured_data": None,
        "tool_response":  None,
    }

    final_state = await hcp_agent.ainvoke(initial_state)
    return final_state["tool_response"]