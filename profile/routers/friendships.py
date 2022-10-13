from fastapi import APIRouter, Depends, Response
from typing import List
from queries.friendships import (
    FriendshipRepository, 
    FriendshipIn, 
    FriendshipOut
)

router = APIRouter()

@router.post("/api/friendships", response_model = FriendshipOut)
def create_friendship(
    friendship: FriendshipIn,
    repo: FriendshipRepository = Depends()
):
    return repo.create(friendship)

@router.get("/api/friendships/{user_one}", response_model = List[FriendshipOut])
def get_list_friends(
    user_one: int,
    repo: FriendshipRepository = Depends()

):
    return repo.get_friend_list(user_one)

@router.get("/api/friendships/{user_one}/pending", response_model = List[FriendshipOut])
def get_pending(
    user_one: int,
    repo: FriendshipRepository = Depends()

):
    return repo.get_pending_requests(user_one)