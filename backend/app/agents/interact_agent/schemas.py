from pydantic import BaseModel, Field
from typing import Optional, Literal
from enum import Enum

class InteractionType(str, Enum):
    MEETING = "Meeting"
    CALL = "Call"
    EMAIL = "Email"
    EVENT = "Event"

class Sentiment(str, Enum):
    POSITIVE = "Positive"
    NEUTRAL = "Neutral"
    NEGATIVE = "Negative"

class InteractionExtraction(BaseModel):
    hcpName: Optional[str] = Field(None)
    date: Optional[str] = Field(None)
    interactionType: Optional[InteractionType] = Field(None)   # 'Meeting' | 'Call' | 'Email' | 'Event'
    topicsDiscussed: Optional[list[str]] = Field(None)
    sentiment: Optional[Sentiment] = Field(None) # 'Positive' | 'Neutral' | 'Negative'
    summary: Optional[str] = Field(None)
    followUpActions: Optional[str] = Field(None)

class EditExtraction(BaseModel):
    """Only the fields the user wants to change — everything else stays None."""
    hcpName: Optional[str] = Field(None)
    date: Optional[str] = Field(None)
    interactionType: Optional[InteractionType] = Field(None)
    topicsDiscussed: Optional[list[str]] = Field(None)
    sentiment: Optional[Sentiment] = Field(None)
    summary: Optional[str] = Field(None)
    followUpActions: Optional[str] = Field(None)


class FollowUpExtraction(BaseModel):
    """LLM extracts follow-up intent from natural language."""
    title: Optional[str] = Field(None, description="Short task title e.g. 'Follow up with Dr Kavi'")
    due_date: Optional[str] = Field(None, description="Due date in MM/DD/YYYY format")
    type: Optional[Literal["Email", "Call", "Visit", "Meeting", "Other"]] = Field(
        None, description="Type of follow-up task"
    )
    description:  Optional[str] = Field(None, description="Short task detail e.g. 'discuss on updated reports'")