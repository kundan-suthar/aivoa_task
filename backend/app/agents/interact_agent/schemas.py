from pydantic import BaseModel, Field
from typing import Optional
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