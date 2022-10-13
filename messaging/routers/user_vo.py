from fastapi import APIRouter, Depends
from typing import List
from queries.conversations import (
    UserVOIn,
    UserVOOut,
    UserVORepository
)

router = APIRouter()

@router.post("/api/conversations", response_model = UserVOOut)
def create(
    conversation: UserVOIn, 
    repo: UserVORepository = Depends()
) -> UserVOOut:
    repo.create(conversation)
