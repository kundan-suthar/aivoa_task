
from langchain_core.tools import tool
from app.agents.interact_agent.schemas import InteractionExtraction
from datetime import datetime

@tool
def log_interaction(extracted: dict) -> dict:
    """
    Receives structured extracted data from LLM and returns it
    as a formatted response to show the user for confirmation.
    """
    # return {
    #     "action": "log",
    #     "data": extracted,
    #     "message": "Here is what I captured. Please review and confirm."
    # }
    filled_fields = {k: v for k, v in extracted.items() if v is not None and v != []}
    actions = {
        "confirm": {
            "label": "Confirm",
            "description": "Save this interaction as is"
        },
        "update": {
            "label": "Update",
            "description": "Update specific fields (e.g., 'update date to tomorrow' or 'change HCP name to Dr. Smith')"
        },
        "add_follow_up": {
            "label": "Add follow-up",
            "description": "Schedule or update follow-up action"
        },
        "cancel": {
            "label": "Cancel",
            "description": "Discard and start over"
        }
    }
    # Create a formatted message showing what was captured
    if not filled_fields:
        confirmation_msg = "⚠️ I couldn't capture any interaction details. Could you please provide more information?"
    else:
        field_descriptions = {
            "hcp_name": "HCP Name",
            "interaction_date": "Interaction Date", 
            "interaction_type": "Interaction Type",
            "products_discussed": "Products Discussed",
            "sentiment": "Sentiment",
            "summary": "Summary",
            "follow_up_action": "Follow-up Action"
        }
        
        # Format the captured fields nicely
        captured_items = []
        for field, value in filled_fields.items():
            field_name = field_descriptions.get(field, field.replace('_', ' ').title())
            if isinstance(value, list):
                value = ", ".join(value)
            captured_items.append(f"• **{field_name}**: {value}")
        
        captured_text = "\n".join(captured_items)
        
        # Highlight key fields (HCP name and interaction type) if present
        key_updates = []
        if extracted.get("hcp_name"):
            key_updates.append(f"HCP Name: **{extracted['hcp_name']}**")
        if extracted.get("interaction_type"):
            key_updates.append(f"Interaction Type: **{extracted['interaction_type']}**")
        
        key_update_text = f" ✅ Updated: {', '.join(key_updates)}" if key_updates else ""
        
        confirmation_msg = f"""✅ **Interaction Logged Successfully!**{key_update_text}

        **Captured Details:**
        {captured_text}

        **What would you like to do next?**
        • ✏️ **Update** specific fields (e.g., "update date to tomorrow" or "change HCP name to Dr. Smith")
        • 📝 **Add follow-up** - Schedule or update follow-up action

        Just let me know what you'd like to do!"""
    
    return {
        "action": "log",
        "data": extracted,
        "message": confirmation_msg,
        "filled_fields": filled_fields,
        "timestamp": datetime.now().isoformat(),
        "suggestions":actions
    }



@tool
def edit_interaction(current_data: dict, edit_delta: dict) -> dict:
    """
    Merges only the changed fields (edit_delta) into the existing
    structured_data. Fields not mentioned in the edit stay untouched.
    """
    updated = {**current_data}

    for field, new_value in edit_delta.items():
        if new_value is not None and new_value != [] and new_value != "":
            updated[field] = new_value

    return {
        "action": "edit",
        "previous_data": current_data,
        "updated_data": updated,
        "changed_fields": [
            k for k, v in edit_delta.items()
            if v is not None and v != [] and v != ""
        ],
        "message": "Got it. Here is the updated interaction."
    }