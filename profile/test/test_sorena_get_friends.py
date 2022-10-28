from routers.accounts import AccountToken
from queries.accounts import AccountOut
from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from routers.friendships import get_list_friends
from queries.friendships import FriendshipRepository

client = TestClient(app)

# # Arrange
# fakeAccOut = AccountOut(id="1", username="username")

# fakeAccToken = AccountToken(
#     access_token= "greatbig1337elephants1234",
#     token_type= "Bearer",
#     account= fakeAccOut,
# )

# # Act
# async def account_out_override():
#     return fakeAccOut

# app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override


# def test_get_account():
#     response = client.get("/token", cookies={"fastapi_token" : "greatbig1337elephants1234"})

# # Assert
#     assert response.status_code == 200
#     print(response.json())
#     assert response.json() == fakeAccToken


# Arrange
fakeAccount = {"id": 50, "username": "Jamie123"}

fakeAccountToken = {
    "access_token": "thisisareallylong10000accesstoken999999",
    "token_type": "Bearer",
    "account": {"id": 50, "username": "Jamie123", "hashed_password": 'f3wiankolc3jlfea'}
}


# Act


async def account_out_override():
    return fakeAccount

app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override


def test_get_account():
    response = client.get("/token", cookies={"fastapi_token":"thisisareallylong10000accesstoken999999"})

# Assert
    assert response.status_code == 200
    print(response.json())
    assert response.json() == fakeAccountToken


class FakeFriendshipRepository(TestClient):
    def get_friend_list(self, id: int):
        return [
            {
                "image": None,
                "dog_name": "Testing",
                "city": "Nashville",
                "state": "TN",
                "id": 5
            },
            {
                "image": None,
                "dog_name": "Potato",
                "city": "Here",
                "state": "TX",
                "id": 6
            }
        ]


def test_get_all_friends():

    app.dependency_overrides[FriendshipRepository] = FakeFriendshipRepository

    json = {
        "id": "3"
    }

    # Act

    response = client.get("/api/friendships/6", json=json, data=test_get_account())

    # Assert

    assert response.status_code == 200
    assert response.json() == [
            {
                "image": None,
                "dog_name": "Testing",
                "city": "Nashville",
                "state": "TN",
                "id": 5
            },
            {
                "image": None,
                "dog_name": "Potato",
                "city": "Here",
                "state": "TX",
                "id": 6
            }
        ]

    app.dependency_overrides = {}
