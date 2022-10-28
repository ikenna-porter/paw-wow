# Henry's Journal

# October 3rd, 2022

Today we got the starter project and worked on configuring it.
Sorena and Ikenna shared their screens while everyone else
observed and tried to help if they came across any issues.
We came across one issue that stumped us all where the
docker-compose.yaml file needed volumes on the outer level.
Everything was working how it should be by the end of the day.

# October 4, 2022

Today I worked on implementing the Magic Bell notification API.
I installed it onto the ghi container that handles React components
on my gitlab branch. I came across 69 vulnerabilities and tried
running "npm audit fix" and "npm audit fix --force" but those ran
into some errors. I met with the cohort lead, Tai, and told her
one of my goals this module was to ask more questions and I think
we came to a goal of at least 2 questions a week.

# October 5, 2022

America was the driver today and we worked on creating tables in
the database today. I followed along by watching the exploration
videos from this weekend and found it helpful. During individual
work time, I watched a little bit of the videos and was able to
follow along a lot better while America was live coding. America
was very on top of everything and was able to answer the questions
I had. We ran into some issues that were resolved quickly.

# October 6, 2022

After our team's morning meeting we decided to split up the work
for today. I was able to create a characteristics table and endpoints
for creating, deleting, and updating the table. I ran into some issues
with migrations and it turned out to be a file naming issue where I forgot
to put the file extension at the end of the file name. At the end of the
day I ran into merging conflicts that my team and Curtis helped me through.
Today was very productive individually and as a group and I'm happy
with how far the group has gotten. We're a good team.

# October 10, 2022

Today we spent the day working on individual parts of the project.
I worked on integrating the third party notifications API. I spent
a lot of the day reading the documentation and getting the install
of the API working.

# October 19, 2022

I spent the day reading over websocket documentation and trying to bugfix
a 403 error when trying to implement the websocket. I got help from
instructors and it turned out to be a small problem in the docker.dev file
in the notifications microservice. The websocket worked and established
a connection with the frontend and backend. I worked on the frontend UI
for notifications afterward. The goal for tomorrow is to implement a
notifications UI that can be interacted with. Right now, everything
is hardcoded in.

# October 24, 2022

Today I worked on creating a function that would get other profiles. At 
first I thought it would have to do with the authenticator and allowing you 
to GET but not POST for whoever you want but I think the solution just required
a front-end solution. I ran into a couple issues, the initial one I wasn't able 
to fix but the issue about missing packages after were fixed by running "npm install --force" and the other one was an issue with a migration table. Tomorrow, I think 
I would be able to implement notifications with a third party API. I still need to
have a better understanding of FastAPI and I might ask an instructor for help but I'm
also going to read the documentation tonight and I think that would help with integration.
I also need to test the getOtherProfile function that I added to the front-end. The only issue I can think of is that function overriding anything on the app that has to do with your user but we don't have anything like that currently.

# October 25, 2022

Sorena helped me with being able to view other profiles today. The issue was different
from how I understood it. Profiles are attached to usernames and we didn't want to be
able to view another person's username so having the router go to the username didn't make sense. We ended up using profile IDs and making a new query and router for displaying other profiles. So we spent the morning working on the backend and most of the late morning/afternoon on the frontend portion of displaying another person's profile. We had to join 4 tables so writing out all the column names out multiple times was really fun.

# October 26, 2022
Today after meeting up with the group I looked into the unit test documentation and read up on that. I tried to think of ideas that would let a user know that they're logged in an took some steps trying to implement that.

# October 27, 2022
We worked on getting our unit tests to work today. I tried to add in a feature that would display the name of the logged in user but we ran into an issue where the local storage wasn't cleared after logging out. After looking at it, the nav bar just redirected to the home page instead of using the logout function. I wasn't able to implement the feature I wanted to implement because it wasn't updating on logout without a refresh but that's something that can be worked on. The logout functionality on the nav bar was eventually fixed and we all got together to work on unit tests.

# October 28, 2022