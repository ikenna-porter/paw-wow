# America's Journals

## October 5, 2022

**Today I worked on:**
* Creating the accounts and profile table with my group 
* Creating the router and queries file for the profile table
* Creating the endpoints to create and get a profile
* An issue we ran into was understanding what the fetchone and fetchall methods did. After writing some print statements we found out we needed to use the fetchone method to get the instance id of the profile we had just created. When we use this method, it returns a touple with one item in it, being the instance id that the database returns. Therefore, to actually use that id as the value for the ProfileOut model, we has to indicate the position of that item in the touple ([0]). 
* Another issue we ran into was that we had to have an account to create a profile in our original plan. However, we have not learned about authentication with API yet. Therefore, we left out that foreign key, to allow us to create a profile to check if the endpoints worked properly and were saving data to the database. 

## October 6, 2022

**Today I worked on:**
* Creating the authentication for our application (login, logout, and get token)
* Creating the account endpoints to create, get, and delete an account
* The bugs I ran into were about the name of the columns on the account table. The previous day I created an accounts table with id, username, and pasword as the columns. However, today I had to change password to hashed_password so that the actual password of a user was not saved on to the database. 
* I also linked the accounts and profiles tables using a foreign key from the profile to the account_id

## October 10, 2022

**Today I worked on:**
* Linking all the tables in our databse with my team mate Sorena
* We added foreign keys from the vaccination_record to the profile_id and the characteristics to the profile_id
* We edited the characteristics table to have columns to have more relevant information about a dog
* Since we added some columns to the tables we also had to add those attributes to our models and adjust the query methods to include those new column values.
* An issue we ran into were migrations. We were trying to migrate the changes we had done to the tables in the database. However, we got an Index Error and it pointed to the __init__ file in the migrations directory. We then learned that each migration must have the variable steps, which is a list of lists. Each nested list must contin two SQL commands, one for when we run the command 'migrations up' and one for the command 'migrations down'. We then learned that migrations up will run the desired commands to alter the database and migrations down will undo those changes on the database. 

* Later in the nigth I worked on adding an extra layer of authorization to the profile, characteristics, and vaccinations endpoints. This was so that a user has to be logged in to access any of those endpoints.
* I also used that account data I used from the authenticator to access the account_id to reference when creating a profile, instead of hard-coding that account_id. Therefore, once a user logs in and creates a profile, it'll automatically be linked to their account. 
* The issue I ran into was when I tried doing this with vaccinations and characteristics, since they are linked to the profile_id not the account_id. I solved this problem by testing out an idea - adding another set of commands for the database. I executed another set of commands to the databse to get the profile where the account_id was equal to the id from the account_data from the authenticator. Then I used the fetchone method and indicated the position of the profile_id ([0]). I used that profile_id to automatically link the vaccinations and characteristics to the user's profile withouth having to hard-code that. 

## October 11, 2022

**Today I worked on:**
* Creating a signup form with my team mate Sorena
* We had difficulty using bootstrap because we did not do the npm install inside the ghi file. Instead we downloaded it in the main upmost project directory.
* We then had issue saving the information on the signup form because we had to create an account in the db before creating aprofile for an exisiting account. We were trying to do both things at the same time, and were getting a 500 error. 

* Later in the night I worked on creating a new Sign up form that had username and password fields only
* Once the signup form saved successfully to the db, I created another component to create a profile using the account id returned form the successful response from the post request to the enedpoint to create an account
* I also created a log in form for returning users who already has an account
* I created a toggle button to switch from the signup form and the login form depending on wether the user was returning or new

## October 12, 2022

**Today I worked on:**
* Fixing the log in component, becuase I was getting a 422 error message on the console when I tried to log in
* I fixed this by saving the data from the form as a form rather than an object
* Once I fixed my 422 error, I was able to see the tokem be successfully saved to the browser
* I created a component to show the profile created however, I had an issue with authorization becuase the token was not being saved to the browser when I created an account 
* I temporarily removed the layer of authentication I had placed over all our endpoints to allow me to develop the front-end of our app

## October 13, 2022

**Today I worked on:**
* The profile component to show the details of the profile from the db
* I placed a temporary picture url as the user's avatar. Later I will make a componenet to allow people to upload pictures from their computer
* I made 3 different cards to hold separate information on the user
* I also successfuly fetched for the vaccination records for each profile and displayed them in a single row table. Might alter that later

## October 14, 2022

**Today I worked on:**
* Trying to add the authentication layer again and see if I could save the token to the browser once I signup
* I was unsuccesful at this attempt after 2 hours of trying to futher study the login and get_token methods. I did this with error handling, adding pring statements and using the endpoints tool from fastapi tools
* I decided to table this for later and continue developing the front-end of our app (profile)
* Lesson of the day: authentication is HARD to understand

## October 15, 2022

**Today I worked on:**
* Creating a form to add and edit vaccination records within the same component
* Converted this form into a modal
* Made sure the form information saved correctly to the db

## October 16, 2022

**Today I worked on:**
* Attemped to make the vaccination modal show the information that's in the db instead of an empty form
* Was successful at this momentarily but then the state re-sets to show false for all the vaccinations when I refresh the browser
* I also changed the endpoints for the profile to have username in the url instead of account_id
* I learned that creating a modal is easy but making sure it saved the information correctly and it shows specific data is difficult. I believe this is becuase I am passing around a lot of data through props. Maybe I can try to store some of this data in local storage later

## October 17, 2022

**Today I worked on:**
* Created a modal form to edit characteristics for a profile
* This took a long time becuase I was using a range input and I was setting its value using the data from the database, but then resetting this piece of state for the modal component. This prevented me from being able to move the bar on the range but the new value was still being set to the state according to my console logs. I created an additional function to handle this, and I called it on that input's onChange. I think I woul've saved myself some time if I saved each characteristic in its own state but I wanted to keep it all in one list of objects to keep the html code for my components short. 
* I also added extra information to the characteristic table to add more information on each user's dog
* I created a function that calculated the age of a dog based on their DOB

## October 18, 2022

**Today I worked on:**
* Created a more complete form to add and edit characteristics for a dog. This form now includes the DOB, size, gender, breed, wether or not a dog is fixed, a small bio for each dog, and all the previous ratings for socializing.
* I also rearranged the profile so that everything related to the dog is at the top of the profile with the picture of the dog, all in the same card. The owner's information is the next card, and at the bottom is the table showing the vaccination records. 

## October 19, 2022

**Today I worked on:**
* Creating a modal form that allows users to upload a profile picture of their dog into our database
* After reading documentation on postgresql and their recomendations for saving large objects, such as images in the db, I made a table to hold the profile's picture. I had to alter the profile table in the db to remove the avatar from there, and linked the profile-pic table with the profile with a foreign key.
* Then I had to learn how to convert an image into a base64 string and then into a uri string. A URI string includes the type of data, in this case image/jpeg, it indicates the string is a base64 and the really long string that represents the image. I was then able to insert this string as the src for the image tag in the profile.
* My biggest lesson here was that the react app has no idea the mapping of your computer files. Therefore, when you provide a path for the image, that means nothing to react or the database. Also, when you do save the image with its path, react will make a "fake path" to protect your files. I thought I would have to turn the image into a base64 string and then into byte array to save intot the database. Then to retreive the image I would have to convert the bytea into a base64 string, then into an image to display. But it was much easier to use a uri, and the database accepts that as text. The only downfall is that if you wish to print what the db returns, its a HUGE string. 

## October 20, 2022

**Today I worked on:** 
* Fixing the bugs in the log in and sign up forms. 
* The log in form seemed to be saving the authentication token, but when I tried retreiving a profile (a protected endpoint) I was getting an error that I was unauthorized. I fixed this by fetching the token from the get_token method in the backend, using credentials: 'include' as a configuration for the fetch. This endpoint would respond with the token and would save the token in a cookie in the browser to allow you to navigate to other endpoints in the app. 
* The signup form was also not saving a token in the browser, because I kept getting an unathorized error when trying to create a profile. I also fixed this issue by fetching the token from the backend with credentials as a parameter. I learned that credentials is required as a parameter when fetching from a protected endpoint. 
* I was then able to put the authentication layer back on all our endpoints so that only logged in users could view data on our webpage. I was able to use this account data to not have to hard code an account_id or profile_id for certain endpoints. 

## October 22, 2022

**Today I worked on:** 
* I sovled the issue of state getting lost upon refreshing the page, by storing this state in localstorage. 
* I stored the username in localstorage so that when someone logs in they, the frontend can fetch the profile associated with that username. This also works so that upon signup, the user is directed to their new profile when so that they can add more information about their dog. 
* I also stored the profileId in localstorage, which 6 other components needed to render data or makign fetch requests. This solved a lot of 500 erros, where the backend was getting null for the profile id becasue state was getting lost.
* This allwoed our app to be a lot more functional, becuase now a user could navigate through the app and then come back to their profile and be able to view or edit it. This also allowed us to remove the hardcoded ids we had in place to develop the frontend.

## October 24, 2022

**Today I worked on:** 
* I started to work on the search bar so that users can find other users near them to become friends!
* This was a crutial part of our app becuase it's the only way users can find other users and connecting with others is the essence a social media app
* I was able to show all the profiles in rows of 3 cards per row. Each card included the dog's picture, a couple details (name, age, if they're fixed, gender, size, breed, small bio, name, and the city they live in)
* To display all this information I had to reformat the endpoint that returns all profiles in teh db. I did a left inner join on the profiles, profile-pic, and characteristics table so that a profile would still be returned even if that user doesn't have a picture or characteristics

## October 25, 2022

**Today I worked on:**
* Helping my team mate Sorena, add logic to another user's profile so that it will show a button that reads 'Friends' if the current user and the other user are friends. If the two users were not freinds, a button to send a friend request would show. When this button is pressed, a fetch woudl be made to the backend to see if there's a pending request for the other user, and if so a button that said "pending" would show for the current user. 
* I also fixed the lag in the profile image that caused a user to see the previous user's profile picture. The current user would have to refresh the page to see their own profile picture. Attempting to fix this bug also allowed me to discover two other bugs. One was that when a user wanted to change their picture more than once, the page would crash. I fixed this by removing the image name that was beign retrieving from the file being uploadedm since this was a piece of data that was not beig used. The second bug was that when a user changed or uploaded a picture, they had to refresh the page to see the changes. I changed this by calling the getProfilePic function when I made sure the request was ok. 
* I also made my search bar render other users based on live search. The default for when you try searching for other users, are users that live in the same city as the current user. However, you can still find other users based on their name. The current user's profile will show up on the search bar, but will not have the button to view more details on their profile.
* I worked with my team mates Henry and Sorena to make a button on each card on the search results to view another user's profile. This was vital becuase you have to view another user's profile to add themn as a friedn or be able to message them. This was acheived by adding a value of the other user's id on the button at the bottom of each profile card. That value was then used to put in the route to navigate to that user's profile. 

## October 26, 2022

**Today I worked on:** 
* Helping my team mate Sorean make the Pending friend request button show up as soon as a friendn request is sent. This was done by pulling the asycn function, that fetches this data, out of the UseEffect to be able to call it after the frind request is sent. This allows the page to re-render automatically becuase if the request is sent, the pending status changes in state.
* I also made the nav bar sticky so that it stays in place as you scroll further down the page. 
* I also modified the cards on the search bar so that the picture is in the same format as everywhere else in the app and so that each card is the same size.

## October 27, 2022

**Today I worked on:** 
* Writing my unit test for when a new profile is created. The issue I ran into was that this is a protected endpoint. Therefore, within the test I have to fetch for the authentication token of a fake account and then use that to create a profile
* I also modified the vaccinations table on the profile so that it shows a nice checkmark if the user's dog has those vaccinations, rather than booleans
* I also worked with my team to put together all our features and test our app for deployment
