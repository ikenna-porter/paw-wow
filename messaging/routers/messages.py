from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from queries.messages import (
    MessageIn,
    MessageOut,
    MessageRepository,
    Error
)

router = APIRouter()

@router.get("/api/messages", response_model = List[MessageOut])
def get_all_messages(repo: MessageRepository = Depends()):
    return repo.get_all()