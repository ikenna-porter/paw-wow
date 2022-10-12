from fastapi import APIRouter, Depends
from typing import List
from queries.conversations import (
    ConversationIn,
    ConversationOut,
    ConversationRepository
)

router = APIRouter()

#Get a singular conversation
@router.get("/api/conversations/{conversation_id}", response_model = ConversationOut)
def get_conversation(
    conversation_id: int,
    repo: ConversationRepository = Depends()
) -> ConversationOut:
    return repo.get(conversation_id)

#Get a list of conversations
@router.get("/api/conversations", response_model = List[ConversationOut])
def get_all_conversations(
    repo: ConversationRepository = Depends()
) -> List[ConversationOut]:
    return repo.get_all()

#Create a conversation
@router.post("/api/conversations", response_model = ConversationOut)
def create(
    conversation: ConversationIn, 
    repo: ConversationRepository = Depends()
) -> ConversationOut:
    repo.create(conversation)

#Update a conversation
@router.put("/api/conversations/{conversation_id}", response_model=ConversationOut)
def update(
    conversation_id: int,
    conversation: ConversationIn, 
    repo: ConversationRepository = Depends()
) -> ConversationOut:
    return repo.update(conversation_id, conversation)