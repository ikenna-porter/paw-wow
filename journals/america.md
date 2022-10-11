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


