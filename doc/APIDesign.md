# **Paw Wow API Design**

---

## Login form (login form) 

#### *Login*

Endpoint path: /token
Endpoint method: “POST”

Request shape (form):
  Username: string
  Password: string

Response: User information and token
Response shape (JSON):
  ``` json
  {
    "Account": {
      Key: string,
    },
    "Token": string
  }
  ```


#### *Log out*

Endpoint path: /token
Endpoint method: DELETE

Headers:
  Authorization: Bearer token

Response: Always true
Response shape (JSON):
```json
    true
  ```

---


## Sign Up Endpoint 
* Endpoint path: /api/accounts
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string,
      "content": {
        "username": string,
        "password": string,
        "email": string,
        "city": string,
        "state": string
      }
    }
    ```

---

## Main page/profile (*when user is logged in*)
Endpoint path: /api/profiles/{username}
Endpoint method: GET

Headers: 
  Authorization: Bearer token

Response: A detail of a profile
Response shape (JSON):
  ``` json
  {
    "dog_name": string,
    "city": string,
    "state": string,
    "owner_name": string,
    "img": string,
    "DOB": date,
    "fixed": boolean,
    "size": string,
    "gender": string,
    "dog_bio": string
  }
  ```

---

## Edit profile (form)
Endpoint path: /api/profiles/{username}
Endpoint method: PATCH

Headers:
  Authorization: Bearer token

Request body:
  ``` json
  {
    "dog_name": string,
    "city": string,
    "state": string,
    "owner_name": string,
    "img": string,
    "DOB": date,
    "fixed": boolean,
    "size": string,
    "gender": string,
    "dog_bio": string
  }
  ```

Response: the profile page (detail of a profile)
Response shape: 
  ``` json
  {
    "dog_name": string,
    "city": string,
    "state": string,
    "owner_name": string,
    "img": string,
    "DOB": date,
    "fixed": boolean,
    "size": string,
    "gender": string,
    "dog_bio": string
  }
  ```

---

## Search Bar 
  Endpoint path: api/profiles
  Endpoint method: “GET”

  Query parameters:
    q: search option

  Headers:
    Authorization: Bearer token

  Response: 
    Dog search: A list of user (dog) instances (objects)
  Response shape:
  ``` json
  {
    "dogs": [
  {
  "dog_name": string,
  "img": string,
  "dog_bio": string,
  "size": string,
  "gender": string,
  "fixed": boolean,
  "city": string,
  "state": string
    }
  ]
  }
  ```

---

## Friendships

*List of Friends*

Endpoint path: /api/friendships/{id}
Endpoint method: GET

Headers:
  Authorization: Bearer token

Response: A list of friends
Response shape: 
``` json
  {
    "friends": [
      {
        "image": string,
        "dog_name": string,
        "city": string,
        "state": string,
        "id": int
      }
    ]
  }
```

*Creating a Friendship*

Endpoint path: /api/friendships/{id}
Endpoint method: POST

Headers:
  Authorization: Bearer token

Response: A friendship instance
Response shape:
```json
  {
    "status": int,
    "user_one": int,
    "user_two": int
  }
```

*Updating a Friendship*

Endpoint path: /api/friendships/{user_one}/pending
Endpoint method: PUT

Headers:
  Authorization: Bearer token

Response: A friendship instance
Response shape:
```json
  {
    "status": int,
    "user_one": int,
    "user_two": int
  }
```

*Deleting a friendship*

Endpoint path: /api/friendships/{user_one}/pending
Endpoint method: DELETE

Headers:
  Authorization: Bearer token

Response: A friendship instance
Response shape:
```json
  {
    "status": int,
    "user_one": int,
    "user_two": int
  }
```

*List of Pending Requests*

Endpoint path: /api/friendships/{user_two}/pending
Endpoint method: GET

Headers:
  Authorization: Bearer token

Response: A list of pending requests
Response shape:
```json
  { 
    "pending": [
      "dog_name": string,
      "city": string,
      "state": string,
      "user_one": int,
      "image": string
    ]
  }
```


---

## Conversations

*Get a list of conversations*

* Endpoint path: /api/users_conversations/{primary_user}
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A list of conversations
* Response shape:
    ```json
    {
        "conversations": [
            "id": int,
            "primary_user": int,
            "other_user": int,
            "other_user_dog_name": string,
            "other_user_picture": string
        ]
    }

*Get a message detail*

* Endpoint path: /api/messages/{message_id}
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A detail of a message
* Response shape:
    ```json
    {
      "messages": [
          "message": { 
              "recipient": int,
              "sender": int,
              "timestamp": datetime,
              "content": string,
              "read": boolean,
              "conversation_id": int
          },
      ]
    }
    ```

*Post message to a conversation*

* Endpoint path: /api/messages
* Endpoint method: POST

* Headers:
    * Authorization: Bearer token

* Request Body:
      ```json
    {
      "message": { 
          "sender": int,
          "recipient": int,
          "timestamp": datetime,
          "content": string,
          "read": boolean,
          "conversation_id": int
      },
    }
    ```

* Response: A detail of a conversation
* Response shape:
    ```json
    {
      "messages": [
          "message": { 
              "recipient": int,
              "sender": int,
              "timestamp": datetime,
              "content": string,
              "read": boolean,
              "conversation_id": int
          },
      ]
    }
    ```


