# Sorena's Journal

*Prompt*

The date of the entry

A list of features/issues that you worked on and who you worked with, if applicable

A reflection on any design conversations that you had

At least one ah-ha! moment that you had during your coding, however small

----

## October 28, 2022 

Today I worked on: 

*Writing a New Unit Test and Fixing Deleting a Friend*

At one point today, as I was making a new test since my previous one broke, I realized the way to delete a friend in your friends list is not *fully* functional. Because a user can be in either column of user_one *or* user_two. So I worked on making a new endpoint for that and implemented it into the application. Then I wrote a new unit test with for that. 

We agreed that I could create a new image for the search page and put that in place of the header text.

It is really important to think through edge-cases and testing things fully!


## October 27, 2022

Today I worked on:

*Writing Unit Test and Minor Fixes for Friendships*

For part of the day, I helped Henry with having our logout button actually function as a logout button instead of a redirect. That now clears the local storage upon logging out. With help from America, I implemented an authentication layer for the friends feature, so only logged in users can see their friends. Then, I worked on writing a new unit test that actually creates fake data and passes! I also added a clickable link on the logo to take someone back to the login page and added images in place of the headers for the friends list and pending list. 

We discussed how we would have our logout button looking slightly different on our nav bar. 

When writing a unit test, you will have to use the proper name of the actual function within the one being made up. 

----

## October 26, 2022

Today I worked on:

*Fixing Small Details and ReadMe*

Most of today, I worked on aligning the friend list and request profile cards. Then, I worked on the ReadMe document. There, I wrote out the ReadMe file, reworked our API Design document, created a Database Design document with all of our tables, and redesigned our GHI photos and put them in that document with brief descriptions of each page. 

We had a short conversation about a button placement on another user's profile. We decided to put it under the dog's name inside the card, instead of above it.

Being organized and consistent is really helpful to make styling your page much easier. 

----

## October 25, 2022

Today I worked on:

*Handling edge-cases for Friendship Feature*

The first half of the day, I assisted Henry with creating a new component and back end that allows a user to view another user's profile. Afterwards, I worked on edge-cases for the friendship feature. This included not being able to send a request to someone once it is pending as well as if they accepted the request. As well as the ability to click to a user's profile through your friends list. I also implemented a standard photo to take place if the user has not uploaded their own photo yet. 

Creating the new profile view for other profiles was a lot easier once the idea of doing one very large SQL query was mentioned. It meant not having to do multiple fetch requests. Which I might use to make a new pydantic model to use to check if users are friends for the add-button feature.

## October 24, 2022

Today I worked on:

*Including an image in Friend List and Pending Requests*

I went back to the SQL queries and made a left outer join to include the profile pictures table so that I could have access to the images from a profile. I updated the pydantic model to reflect the change it output. Then included the image on the front end of both the friends list and pending requests. 

We had a conversation about the design of the profile page, the work I did over the weekend with css will be reverted to the previous design. 

SQL is not as scary as it seems and is much easier to approach than trying to create a react hook on the front end which requires much more work. You can use a left outer join as well as an inner join to join two tables. Also, if it is possible for a column to have no value, including that in the pydantic model is also important.

----

## October 20, 2022

Today I worked on:

*Merging large chunks of code*

I got with America to merge a large amount of code from both of our branches together. Which was then pushed to main; we both worked together to fix merge issues and make sure everything was still working. Then I also fixed a turnery operator to show an add button on a profile if it is not of the person logged in and a friends list button if it is.  

I reworked our logo and we all discussed adding it to the sign-up page! 

Using Link is really helpful and much easier to include in the jsx. 

----

## October 19, 2022

Today I worked on:

*Adding buttons to front-end for friends feature*

I made small adjustments to the pending, accept/deny, and creation routers/queries. Then I worked on the front end, where I added buttons to the pending requests so a person can accept or deny a request. I also implemented a link in the nav bar to friends list and the option to go to pending requests from a friends list. 

There were no design conversations today, but I did work on a logo.

Trying to include an icon on a button can cause issues if you click on the icon. I removed the icon.

----

## October 18, 2022

Today I worked on:

*Altering the back-end for proper functionality with front-end*

I went back over the back-end SQL queries to make adjustments so that I was getting the dog name from profiles instead of the id, which was currently displaying on the front end. After making a join between the profile and friendship tables, I was able to get the dog names for either the pending requests or the current friends.

There were no design conversations today, just a lot of working through problems.

It is easier to manipulate the tables in a SQL query and get the actual data you need instead of trying to do anything else.

----

## October 17, 2022

Today I worked on:

*Finishing back-end for friends feature and starting front-end for pending requests*

I mostly worked solo today on finishing the last endpoints for the friends feature, which was the changing of the status for both accepting or denying. As well as fixing a technical issue with showing the pending list of requests for a user. I began working on the front end page for showing the list of pending requests. I got with Jason at the end of the day to help him with the list of friends that have been accepted.

Jason and I realized that we may need to rework our SQL statements to join the data from the profile table, so the front end will have access to the profile data.

It is really helpful to remember that there is a delete http request which makes having two different methods with the same endpoint work. 

----

## October 14, 2022

Today I worked on:

*Implementing the approve function for friends feature*

I mostly worked alone today on the ability to approve an incoming friend request. I ended up having a few issues to still work out by the end of the day, but plan to get back to it on Monday. I was really stuck on what I should be passing in to reference on the database table to make the status change from 0 to 1.

There was not really a conversation on design today.  

Knowing what your database tables have available to reference is super helpful. It is also important to keep in mind the normalization of your tables. 

----

## October 13, 2022

Today I worked on:

*Changing follower feature to friends feature*

Jason and I pair programmed today. I changed the follower feature we had thus far
to reflect a friendship instead. Which entailed changing the table name
and including a status column and renaming some columns. I also created the method
to show pending friend requests in the back-end. We both created the ability to
get a user's friend list of accepted friends.

We discussed whether we should continue with the follower feature or
go ahead and tackle a friends feature.

After making the SQL commands, if there is a place holder, what follows after
the three quotations is what key that value will be.

----

## October 12, 2022 

Today I worked on:

*Creating a follower feature*

Jason and I pair-programmed today, where I was primarily coding. We created a table
for followers, which has an id which is the primary key, a followee and a follower which
referenced the profile id. We also created a create method to create a new follow instance.

We had a conversation about proceeding with the friends list, which may be harder to implement
within our deadline, or to go for a follow feature instead which would be more
manageable. And then go for a friends list as a stretch goal. 

It is useful to create an id for each table acting as the primary key. And it is
also important to make sure you are returning the correct pydantic model in your
queries! 

----

## October 11, 2022

Today I worked on:

*Creating a form to sign up*

America and I pair-programmed today, where I was the one coding. We created a form
that allows a user to sign up for an account. It is still a work in progress, as it does not currently save on submit. We also configured everything to have bootstrap properly working
in our application.

We had a conversation with Ikenna over the schema for the messaging database tables.
Which led to the decision to remove one of the tables to stay in a normalized form.

To ensure that bootstrap works in your react application, it's important to
change into the ghi directory and run the npm commands. As well as
importing that bootstrap directory from node_modules in index.js.

----

## October 10, 2022

Today I worked on:

*Connecting foreign keys throughout the profile*

America and I pair-programmed today. We had to alter tables and columns to 
include the associated foreign keys, as well as make an adjustment to a table name.
This meant we also had to fix any differences throughout the routers/queries to 
reflect the changes in the columns that were made.

After discussing with SEIRs, we decided to stick with our plan to have
the profile table contain a reference to the account table. And for profile to 
share a foreign key to our other tables, vaccination records and characteristics. 

From doing migration files, we have learned that our steps needed to contain
two strings within each step. This is based on how the code is written to handle
the migrations up and migrations down commands. 

----

## October 6, 2022

Today I worked on:

*Creating endpoints for vaccination*

I created a migration file to create a vaccination table. In queries, I created pydantic models for
Vaccination in and out and then the functionality to create, update, delete, and get one record. 

We decided to include a separate link to view a single vaccination record.

It is super important to include .py at the end of your migration file. It's easy to forget when you're typing
a very long name. But important regardless! 

----

## October 5, 2022

Today I worked on:

*Creating our queries and routers for profile service.*

As a group, with America driving, we implemented our first routers and queries for the profile service.
We created pydantic models for ProfileIn and ProfileOut, utilizing them to create a get and post request.

We were debating whether to use one large table or create multiple tables to hold our data for profiles and their details.
We agreed upon creating separate tables to better manage the data and be able to work with git with less conflicts.

After the pair-programming today, I understood better why we include an index location for the id when it is being returned
from the results. Because when the ProfileOut is generated, an ID is created by SQL that is placed at index 0. 

----

## October 4, 2022

Today I worked on:

*Fixing our services to run FastAPI.*

As a group, we made sure that everyone was able to successfully launch 
all of the docker containers and pg-admin. We troubleshot through some issues and
in the end, we got everything working and pushed to main. So everyone could
do a git pull with properly functioning code!

We are curious, after discussing, if creating a migration file is going to cause
any issues with having to keep Docker running constantly as a workaround. Otherwise,
would we need to work on the migration file prior to starting our routers/queries? 

Saving is super important after doing a git pull...

Also, if you are on an M1 chip, there is another command that is necessary to get things to
work properly. And if we can get things functioning on one computer, it is much
easier to have people pull done the functioning code!

----

## October 3, 2022

Today, I worked on:

*Setting up the docker files and ghi folder with my team.*

Before getting started, we all discussed how we should approach our MVPs.
We all agreed that we will follow the order of our Excalidraw pages as
the order of importance for implementing those functions.

We realized we needed to have Services and Volumes on their own so 
when we run the command to bring up docker containers, it is able
to also create the volume.

