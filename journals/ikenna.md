# Ikenna's Journal

## Oct 3, 2022

**Today, I worked on:**
* Completing the project set-up with my group. We were able to divide our app into three separate microservices and we successfully got all of our Docker containers up and running.

## Oct 4, 2022

**Today, I worked on:**
* Today I decided it would be best if I spent more time studying up on FastAPI and SQL. I felt like I was not ready to start building an app using this framework, and that I wouldn't be able to communicate my ideas clearly to my group.

## Oct 5, 2022
* Today we worked on creating our first two routes. America drove the session today and did a very good job at filling us in on what was going on. I have a better understanding of how FastAPI works now, but I think I'll need to go back and study a bit more until I am truly confident in it.
## Oct 6, 2022
* Today I started thinking about the design of the messaging microservice. I decided to make a few user_vo endpoints, which would poll information from the central microservice.
## Oct 10, 2022
* Today I worked with Jason to finish making the endpoints for the profile page. We ended up creating three endpoints and their routers. My teammates focused on creating the endpoints for vaccinations and characteristics.
## Oct 11, 2022
* Today I focused almost exclusively on the design of the messages table in SQL. I decided that it would make the most sense to have a table to represent each individual message, each chat, and each conversation. Honestly, most of the day went into researching the best way to go about representing a conversation in the database. I didn't really start on the migrations file until the end of the day.
## Oct 12, 2022

* Today I continued working on the design of a chat, message and conversation. I also wrote the migrations file and started writing the endpoints. After talking to Sorena and America, I decided to drop the chat table and just have a "message" and "conversation" table. Each message would have a conversation_id column that links it to an instance of a conversation between two users. Once I finished this, I worked on the endpoints.
## Oct 13, 2022

* Today I worked on finishing up the backend for the messaging feature. I wanted to start working on the WebSocket, but I ran into a lot of error messages with the database and endpoints. The most frustrating was not realizing that "user" is a reserved keyword in Postgres. I spent over an hour trying to figure out why I kept getting a "syntax error" in the migrations file because of this. I also realized today that I need to create user_vo endpoints to represent users in the database, so that I can start testing out the rest of the endpoints. Overall, today was pretty frustrating.

## Oct 14, 2022
* I missed class this day because I had to catch a flight for my move. Unfortunately, there wasn't any WiFi on either of the planes so I didn't work on the project at all.
## Oct 18, 2022

* Today I feel like I made a decent amount of progress on messaging. I have a lot of the logic for the front end set up, excluding the websocket. I spent most of my time working on the flow of data through state on the front end, although I did have to fix a bug on the backend that made it impossible for me to retrieve a list of messages from the database. Overall, I feel like I made a decent amount of progress, but today more than ever I realized just how much work has to be done before submitting the project next week. Tomorrow, if I can finish working on the flow of state, I would like to implement the websocket.
## Oct 19, 2022
* Today I started working on the websocket. I'm not really sure what most of the code is used for. There are a few methods on the Connection Manager class, for example, that I don't understand (i.e. send_personal_message). I'm also not sure if I understand what's happening behind the scenes to get the websocket to work. It seems like a lot of the work done is abstracted away.

## Oct 20, 2022
* Today I continued working with the websockets. It's a bit more complicated than I originally thought it would be. There was a bug where my websocket wasn't connecting at all, but Curtis later came in and told me that I had to change where I wrote the "app.include_router(router)" line in main.py for the websocket to connect. I'm not really sure why, to be honest, but immediately after I noticed that it started connecting. Now I just have to find a way to make sure it sends messages to the correct conversation and not all of them.
## Oct 21, 2022
* Today I focused on changing the styling of messaging. I made it to where the scrolling bar would always be at the bottom of the messages container. The bottom is also where the most recent message is stored. I also worked on styling the container of conversations and I added styles to how the message bubbles appeared. It's crazy how much time can be spent on just using vanilla CSS. Now I understand why libraries like Bootstrap exist.
## Oct 24, 2022

* Today has been quite challenging. Mainly because I have to take data from the messaging microservice and add it to profile. In the end, we decided not to have separate microservices since we wouldn't have the time to create a poller to facilitate communication. Not only that, but now that I know what the profile table looks like, I also have to change the shape of my data so that it matches that of the rest of the application. Finally, there is currently no way for a user to create a conversation and have that conversation permanently associated with the user and the person they're talking to. So yeah...I have my work cut out for me today. I hope to be done with all of this and with all of the design for the front end on messaging, so that I can dedicate Wed-Friday to making the test cases and to deploying the app. 

## Oct 25, 2022
Sorena helped out tremendously today! Upon realizing that I needed to access the users' picture and dog name in order to render them in the frontend's conversations list, I started worrying since I saw that all of this information was in different tables. One of these tables (conversations) referenced another table twice (two foreign keys referencing the profile id). I was uncertain if I had breached one of the database normalization principles, but luckily she told me that I didn't and that it is indeed possible to retrieve the required information by using joins. She later showed me how and told me that I needed to store them in the queries directory, under the functions that were called on each of those inputs. I'm very grateful for her help since she saved me an unbelievable amount of time! 

## Oct 26, 2022
I'm just now starting to realize how much work has to be done for messaging. I think I wasted a lot of time trying to build out the microservice in its own environment before integrating it with the rest of the app. This prevented me from properly testing out the feature and how it would interact with the application as a whole. It also resulted in me overlooking key pieces of functionality. For example, when I was designing messaging, I only intended for it to be reached when the user clicked on the "Messages" button on the navbar. It later came to my attention this week that we would also need to include a messaging button in each user's profile. This required me to find a way to retrieve the IDs upon clicking a button. The main user was easy since it was already stored in local storage, but the other user required me passing state through a react router tag into an entirely different component (no shared ancestors). This required some research on my part. Things like this kept happening this week, which made me realize that I was much further from completing the messaging feature than I originally imagined.

## Oct 27, 2022
* Today we decided not to include messaging in the MVP of PawWow. This was kind of a letdown for me since I really thought I would be able to complete it in time, but it turned out to be much more difficult than I expected. The hardest part is getting the WebSocket to work properly. It seems to have a mind of its own. Sometimes it will connect properly and send a message. Other times it won't. I'm not sure why this is, still. Another concern is that it always broadcasts a message to all of the open connections, but now that I think about it, maybe I'm wrong. It's possible that it is broadcasting the message to the correct connection, but that I have written my React Chat component in such a way to where the message gets rendered in each and every chat, and not the appropriate chat. I'll have to go back and look into this. Fixing this, would get messaging one step closer to being complete.