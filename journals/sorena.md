# Sorena's Journal

*Prompt*

The date of the entry

A list of features/issues that you worked on and who you worked with, if applicable

A reflection on any design conversations that you had

At least one ah-ha! moment that you had during your coding, however small

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

