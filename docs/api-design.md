This is where we will design our APIs

<<<<<<< HEAD
1) Login form (login form) 
  Login

  Endpoint path: login/
  Endpoint method: “POST”
  Request shape (form):
      Username: string
      Password: string
  Response: User information and token
  Response shape (JSON):
    ``` json
    {
      “Acount”: {
        Key: string,
      },
      “Token”: string
    }
    ```


  Log out

  Endpoint path: /token
  Endpoint method: DELETE

  Headers:
    Authorization: Bearer token

  Response: Always true
  Response shape (JSON):
      ```json
      true
      ```


2) Sign-up form (if user has no account) - Ikenna


3) Main page/profile (when user is logged in)
  Endpoint path: /
  Endpoint method: GET

  Headers: 
    Authorization: Bearer token

  Response: A detail of a profile
  Response shape (JSON):
    ``` json
    {
      "name": string,
      "picture_url": string,
      "description": string,
      "vaccination": boolean,
      "fixed": boolean,
      "owner": {
        "owner_name": string,
        "owner_picture_url": string,
        "owner_description": string
      }
    }
    ```


4) Edit profile (form)
  Endpoint path: /
  Endpoint method: PATCH

  Headers:
    Authorization: Bearer token

  Request body:
  ``` json
    {
      "name": string,
      "picture_url": string,
      "description": string,
      "vaccination": boolean,
      "fixed": boolean,
      "size": string,
      “age": string,
      "owner": {
        "owner_name": string,
        "owner_picture_url": string,
        "owner_description": string
    }
  ```

  Response: the profile page (detail of a profile)
  Response shape: 
  ``` json
    {
      "name": string,
      "picture_url": string,
      "description": string,
      "vaccination": boolean,
      "fixed": boolean,
      "size": string,
      “age": string,
      "owner": {
        "owner_name": string,
        "owner_picture_url": string,
        "owner_description": string
    }
  ```

5) Messaging - Ikenna


6) Notifications - Henry
### Create notifications
Endpoint path: notifications/
Endpoint method: "POST"
Headers: 
Authorization: Bearer token
Response: Send a notification to one or multiple users
Response shape:
{
"ID": "string",
"Title": "string",
"Content": "string",
"Action_url": "string",
}

### Fetch notifications
Endpoint path: notifications/
Endpoint method: "GET"
Headers:
	Authorization: Bearer token
Response: Fetch user's notifications by ID
Response shape:
{
"Per_page": Integer,
"Page": Integer,
"Read": Boolean
}


### Mark notification as read
Endpoint path: notifications/
Endpoint method: "GET"
Headers:
	Authorization: Bearer token
Response: Mark a user's notification as read
Response shape: ""

### Delete a notification
Endpoint path: notifications/
Endpoint method: "DELETE"
Headers:
	Authorization: Bearer token
Response: Delete a user's notification by ID
Response shape: ""


7) Search Bar 
  Endpoint path: search/
  Endpoint method: “GET”
  Query parameters:
    q: search option
  Headers:
    Authorization: Bearer token
  Response: 
    Dog search: A list of user (dog) instances (objects)
    Park search: A list of parks
  Response shape:
  ``` json
  {
    “dogs”: [
  {
  “Name”: string,
  “Owner_name”: string,
  “Vaccinated”: boolean,
  “Size”: string,
  “Age”: string
    }
  ]
  }
  ```

8) Friends list
Endpoint path: /friends
Endpoint method: GET

Headers:
  Authorization: Bearer token

Response: A list of friends
Response shape: 
``` json
  {
    "friends": [
      {
        “Name”: string,
        “Owner_name”: string,
        “Vaccinated”: boolean,
        “Size”: string,
        “Age”: string,
      }
    ]
  }
```
=======
<!-- Conversations -->

<!-- Get a list of conversations -->
* Endpoint path: /conversations_list
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A list of conversations
* Response shape:
    ```json
    {
        "conversations": [
            conversation: { 
                recipient: object, #picture_url and name come from here
                date_of_last_message: date,
                time_of_last_message: time,
                content_of_last_message: string,
            }
        ]
    }

<!-- Get a conversation detail -->
* Endpoint path: /conversation/id
* Endpoint method: GET

* Headers:
    * Authorization: Bearer token

* Response: A detail of a conversation
* Response shape:
    ```json
    {
        "recipient": object,
        "messages": [
            message: { 
                recipient: object, #picture_url and name come from here
                sender: object, #picture_url and name come from here
                date: date,
                time: time,
                content: string,
            },
        ]
    }
    ```

<!-- Post message to a conversation -->
* Endpoint path: /conversation/id
* Endpoint method: POST

* Headers:
    * Authorization: Bearer token

* Request body:
    ```json
    {
        "recipient": object,
        "messages": [
            message: { 
                recipient: object, #picture_url and name come from here
                sender: object, #picture_url and name come from here
                date: date,
                time: time,
                content: string,
            },
        ]
    }
    ```

* Response: A detail of a conversation
* Response shape:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```


<!-- Sign Up Endpoint -->
* Endpoint path: /token
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
>>>>>>> 2622d58dbd3a623ce95d71daed49e5a147fb826d
