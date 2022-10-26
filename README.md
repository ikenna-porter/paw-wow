# Paw Wow

*Designed and Created By*
- America Guerrero
- Henry Tran
- Ikenna Porter
- Jason Olefson
- Sorena Sawyer

*Paw Wow* - a place for dog lovers to find new friends and socialize their dog, wherever they go!

## Design

- API Design (Create this MD file and link here)
- Data Model (Create this MD file and link here)
- GHI (Create this MD file and link here)

----

## Intended Market

Paw Wow has been created for dog-owners who want to socialize their companion. Whether they stay local or travel to another city, they'll easily be able to find other dogs nearby and make arrangements for a doggy-play-date! 

----

## Functionality

- Visitors to our site can create an account with a username and password
    - from there, users can create their profile with basic information about themselves and their dog
    - once that is complete, users are routed to their profile and are provided a standard image until they upload their own
    - at their profile page, users can update a multitude of profile details:  
        - profile picture
        - dog bio and characteristics
        - owner bio
        - vaccination records
- Users can then search for other local dogs in their city
    - using the search feature allows others to view and navigate to other profiles
- Upon viewing another profile, users will have the ability to send a friend request or a message
- Users can access their messages from the navbar
    - here, they will see all of their conversations
    - clicking into a selected conversation allows users to communicate live
- Users can access their friends from the navbar
    - here, they will see their current 'Paw Pals'
        - there is the ability to view the friends profile as well as removing them from the friends list 
    - the friends list page holds the navigation to the user's incoming, pending friend requests 
        - here, a user will be able to view the profile of the other user and be able to approve or deny the request

----

## Installation

1. Clone the repository down to your local machine

2. CD into the new project directory

3. Run docker volume create postgres-data

4. Run docker compose build

5. Run docker compose up

6. Run docker exec -it paw-wow-profile-1 bash

7. Run python -m migrations up

8. Exit the container's CLI

9. Open a new terminal

10. CD into project directory

11. CD into ghi and run ```npm install cdbreact --force```

12. Enjoy making friends on Paw-Wow!


## Roadmap

- Implement Notifications
- Show Mutual Friends
- Include a Searchable Map
- Implement Geo-location