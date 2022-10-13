# Ikenna's Journal

## Oct 3, 2022

**Today, I worked on:**
* Completing the project set-up with my group. We were able to divide our app into three separate microservices and we successfully got all of our Docker containers up and running.

## Oct 4, 2022

**Today, I worked on:**
* Today I decided it would be best if I spent more time studying up on FastAPI and SQL. I felt like I was not ready to start building an app using this framework, and that I wouldn't be able to communicate my ideas clearly to my group.

## Oct 5, 2022

**Today, I worked on:**
* Today we worked on creating our first two routes. America drove the session today and did a very good job at filling us in on what was going on. I have a better understanding of how FastAPI works now, but I think I'll need to go back and study a bit more until I am truly confident in it.

## Oct 10, 2022
* Today I worked with Jason to finish making the endpoints for the profile page. We ended up creating three endpoints and their routers. My teammates focused on creating the endpoints for vaccinations and characteristics.
## Oct 11, 2022
* Today I focused almost exclusively on the design of the messages table in SQL. I decided that it would make the most sense to have a table to represent each individual message, each chat, and each conversation. Honestly, most of the day went into researching the best way to go about representing a conversation in the database. I didn't really start on the migrations file until the end of the day.
## Oct 12, 2022

* Today I continued working on the design of a chat, message and conversation. I also wrote the migrations file and started writing the endpoints. After talking to Sorena and America, I decided to drop the chat table and just have a "message" and "conversation" table. Each message would have a conversation_id column that links it to an instance of a conversation between two users. Once I finished this, I worked on the endpoints.
## Oct 13, 2022

* Today I worked on finishing up the backend for the messaging feature. I wanted to start working on the WebSocket, but I ran into a lot of error messages with the database and endpoints. The most frustrating was not realizing that "user" is a reserved keyword in Postgres. I spent over an hour trying to figure out why I kept getting a "syntax error" in the migrations file because of this. I also realized today that I need to create user_vo endpoints to represent users in the database, so that I can start testing out the rest of the endpoints. Overall, today was pretty frustrating.

