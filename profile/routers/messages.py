from fastapi import APIRouter, Depends
from typing import List
from queries.messages import (
    MessageIn,
    MessageOut,
    MessageRepository
)

router = APIRouter()

@router.get("/api/messages/{conversation_id}", response_model = List[MessageOut])
def get_all_messages(
    conversation_id: int,
    repo: MessageRepository = Depends()
):
    return repo.get_all(conversation_id)

# @router.get("/api/messages/{message_id}", response_model = MessageOut)
# def get_one(
#     message_id: int,
#     repo: MessageRepository = Depends()
# ) -> MessageOut:
#     return repo.get_one(message_id)

@router.post("/api/messages")
def create(
    message: MessageIn, 
    repo: MessageRepository = Depends()
) -> MessageOut:
    return repo.create(message)

@router.delete("/api/messages/{message_id}", response_model=bool)
def delete(
    message_id: int, 
    repo: MessageRepository = Depends()
) -> bool:
    return repo.delete(message_id)
