from fastapi.testclient import TestClient
from routers.accounts import AccountToken
from queries.accounts import AccountOut
from main import app
from unittest import TestCase
from authenticator import authenticator
from routers.friendships import get_list_friends
from queries.friendships import FriendshipRepository

client = TestClient(app)

class FakeFriendshipRepo:
    def remove_friend(self, id, user_two):
        return True

def test_remove_friend():
    app.dependency_overrides[FriendshipRepository] = FakeFriendshipRepo

    response = client.delete('/api/friendships/6/3')

    assert response.status_code == 200
    assert response.json() == True































# # Arrange
# fakeAccOut = {'id': 1, 'username': "testingname"}

# fakeAccToken = {
#         'access_token': "greatbig1337elephants1234",
#         'token_type': "Bearer",
#         'account': fakeAccOut,
#     }

# # Act
# async def account_out_override():
#     return fakeAccOut

# app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override


# def test_get_account():
#     response = client.get("/token", cookies={"fastapi_token":"greatbig1337elephants1234"})

# # Assert
#     assert response.status_code == 200
#     print(response.json())
#     assert response.json() == fakeAccToken


# class FakeFriendshipRepository(TestCase):
#     def get_friend_list(self, id: int):
#         return [
#             {
#                 "image": None,
#                 "dog_name": "Testing",
#                 "city": "Nashville",
#                 "state": "TN",
#                 "id": 5
#             },
#             {
#                 "image": None,
#                 "dog_name": "Potato",
#                 "city": "Here",
#                 "state": "TX",
#                 "id": 6
#             }
#         ]


# def test_get_all_friends():

#     app.dependency_overrides[FriendshipRepository] = FakeFriendshipRepository

#     # Act

#     response = client.get("/api/friendships/6", data=test_get_account())

#     # Assert

#     assert response.status_code == 200
#     assert response.json() == [
#             {
#                 "image": None,
#                 "dog_name": "Testing",
#                 "city": "Nashville",
#                 "state": "TN",
#                 "id": 5
#             },
#             {
#                 "image": None,
#                 "dog_name": "Potato",
#                 "city": "Here",
#                 "state": "TX",
#                 "id": 6
#             }
#         ]

#     app.dependency_overrides = {}
