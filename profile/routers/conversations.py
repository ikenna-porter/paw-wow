from fastapi import APIRouter, Depends
from typing import List
from queries.conversations import (
    ConversationIn,
    ConversationOut,
    ConversationRepository,
)

router = APIRouter()


@router.get("/api/conversations/{conversation_id}", response_model=ConversationOut)
def get_conversation(
    conversation_id: int, repo: ConversationRepository = Depends()
) -> ConversationOut:
    return repo.get(conversation_id)


@router.get(
    "/api/users_conversations/{primary_user}", response_model=List[ConversationOut]
)
def get_all_conversations(
    primary_user: int, repo: ConversationRepository = Depends()
) -> List[ConversationOut]:
    return repo.get_all(primary_user)


@router.post("/api/conversations")
def create(
    conversation: ConversationIn, repo: ConversationRepository = Depends()
) -> ConversationOut:
    return repo.create(conversation)


@router.put("/api/conversations/{conversation_id}", response_model=ConversationOut)
def update(
    conversation_id: int,
    conversation: ConversationIn,
    repo: ConversationRepository = Depends(),
) -> ConversationOut:
    return repo.update(conversation_id, conversation)
