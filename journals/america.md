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

