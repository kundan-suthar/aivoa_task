from fastapi import APIRouter
from app.schemas.user_input import UserInput
from app.agents.interact_agent.runner import run_agent

router = APIRouter(tags=['interaction'])

@router.post("/interact")
async def extract_interaction(user_input: UserInput):
   return await run_agent(user_input.user_message)