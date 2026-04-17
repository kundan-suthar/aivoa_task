
from typing import TypedDict, Optional, Annotated
import operator

class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    raw_input: str
    intent: Optional[str]           # "log" | "edit" | "followup" — detected by router
    structured_data: Optional[dict]
    tool_response: Optional[dict]  