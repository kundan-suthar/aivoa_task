from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routers.interaction import router as interaction_router
app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

app.include_router(interaction_router)