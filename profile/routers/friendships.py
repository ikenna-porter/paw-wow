from fastapi import APIRouter, Depends, Response
from typing import List
from queries.friendships import (
    FriendshipRepository, 
    FriendshipIn, 
    FriendshipOut,
    FriendListOut,
    FriendsOut
)

router = APIRouter()

@router.post("/api/friendships/{id}", response_model = FriendshipOut)
def create_friendship(
    friendship: FriendshipIn,
    repo: FriendshipRepository = Depends()
):

    return repo.create(friendship)

@router.get("/api/friendships/{id}", response_model = List[FriendsOut])
def get_list_friends(
    id: int,
    repo: FriendshipRepository = Depends()

):
    return repo.get_friend_list(id)

@router.get("/api/friendships/{user_two}/pending", response_model = List[FriendListOut])
def get_pending(
    user_two: int,
    repo: FriendshipRepository = Depends()

):
    return repo.get_pending_requests(user_two)

@router.put("/api/friendships/{user_one}/pending")
def update_request(
    # user_one: int,
    # user_two: int,
    user_one,
    repo: FriendshipRepository = Depends()

):
    return repo.approve_request(user_one)

@router.delete("/api/friendships/{user_one}/pending")
def update_deny_request(
    # user_one: int,
    # user_two: int,
    user_one,
    repo: FriendshipRepository = Depends()

):
    return repo.deny_request(user_one)