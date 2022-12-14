# Paw Wow

*Designed and Created By*
- America Guerrero
- Henry Tran
- Ikenna Porter
- Sorena Sawyer

*Paw Wow* - a place for dog lovers to find new friends and socialize their dog, wherever they go!


## Design

- [API Design](https://gitlab.com/amegue97/paw-wow/-/blob/main/doc/APIDesign.md)
- [Data Model](https://gitlab.com/amegue97/paw-wow/-/blob/main/doc/DataModel.md)
- [GHI](https://gitlab.com/amegue97/paw-wow/-/blob/main/doc/GHI.md)


## Intended Market

Paw Wow has been created for dog-owners who want to socialize their companion. Whether they stay local or travel to another city, they'll easily be able to find other dogs nearby! 


## Functionality of MVP

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
- Upon viewing another profile, users will have the ability to send a friend request
- Users can access their friends from the navbar
    - here, they will see their current 'Paw Pals'
        - there is the ability to view the friends profile as well as removing them from the friends list 
    - the friends list page holds the navigation to the user's incoming, pending friend requests 
        - here, a user will be able to view the profile of the other user and be able to approve or deny the request
- Users can logout through the navbar, and upon logging out, the local storage clears

## Preview

![](doc/images/PawWow.Gif.gif)


## Installation

1. Clone the repository down to your local machine

2. CD into the new project directory

3. Run ```docker volume create postgres-data```

4. Run ```docker compose build```

5. Run ```docker compose up```

6. Run ```docker exec -it paw-wow-profile-1 bash```

7. Run ```python -m migrations up```

8. Exit the container's CLI

9. Open a new terminal

10. CD into project directory

11. CD into ghi and run ```npm install cdbreact --force```

12. Enjoy making friends on Paw-Wow!


## Roadmap

- Complete Messaging Functionality
- Implement Notifications
- Show Mutual Friends
- Include a Searchable Map
- Implement Geo-location


## Run Tests

1. Open Docker

2. From Containers, find and open Profile terminal

3. Run ```pytest``` 