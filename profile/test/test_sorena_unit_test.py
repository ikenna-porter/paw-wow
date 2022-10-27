from routers.accounts import AccountToken
from queries.accounts import AccountOut
from main import app
from fastapi.testclient import TestClient
from authenticator import authenticator
from routers.friendships import get_list_friends
from queries.friendships import FriendshipRepository

client = TestClient(app)

# Arrange
fakeAccOut = AccountOut(id="1", username="username")

fakeAccToken = AccountToken(
    access_token= "greatbig1337elephants1234",
    token_type= "Bearer",
    account= fakeAccOut,
)

# Act
async def account_out_override():
    return fakeAccOut

app.dependency_overrides[authenticator.try_get_current_account_data] = account_out_override


def test_get_account():
    response = client.get("/token", cookies={"fastapi_token":"greatbig1337elephants1234"})

# Assert
    assert response.status_code == 200
    print(response.json())
    assert response.json() == fakeAccToken



# Arrange

# app.dependency_overrides[get_list_friends] = FriendshipRepository

# def test_get_all_friends_when_empty():
#     # Act
#     response = client.get("/api/friendships/100")

#     # Assert
#     assert response.status_code == 200
#     assert response.json() == []

