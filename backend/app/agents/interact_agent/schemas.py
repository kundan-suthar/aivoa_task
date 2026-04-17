from pydantic import BaseModel, Field
from typing import Optional

class InteractionExtraction(BaseModel):
    hcp_name: Optional[str] = Field(None)
    interaction_date: Optional[str] = Field(None)
    interaction_type: Optional[str] = Field(None)
    products_discussed: Optional[list[str]] = Field(None)
    sentiment: Optional[str] = Field(None)
    summary: Optional[str] = Field(None)
    follow_up_action: Optional[str] = Field(None)