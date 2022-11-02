import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Conversation from './Conversation';
import Conversations from './Conversations';
import NoChat from './NoChat';
import Chat from './Chat';
import './style.css';
// import {ReconnectingWebSocket} from './reconnectWebsocket';

export default function MessagingTest(props) {
    const [selectedConversation, setSelectedConversation] = useState(0);
    const [messages, setMessages] = useState(['']);
    const [conversations, setConversations] = useState([]);
    const location = useLocation();
    const [otherUserId, setOtherUserId] = useState(0);
    const profileId = localStorage.getItem('profileId');


    const createConversation = async () => {
        const userIds = {
            primary_user: parseInt(profileId),
            other_user: parseInt(location.state.othersId)
        };
        const url = "http://localhost:8100/api/conversations";
        const fetchConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: "POST",
            mode: "cors",
            body: JSON.stringify(userIds)
        };
        console.log(profileId, location.state.othersId)

        //fetch to create conversation
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log(data.id)
            return data.id;
        }
    }

    // //temporarily renders conversation card once it has been created
    // const renderNewConversationCard = async (conversationId) => {
    //     console.log(conversationId)
    //     const response = await fetch(`http://localhost:8100/api/conversations/${conversationId}`);

    //         if (response.ok) {
    //             const conversationData = await response.json();
    //             console.log(conversationData)
    //             const dogName = conversationData.other_user_dog_name;
    //             let dogPic = conversationData.other_user_picture;
    //             dogPic.length > 0? dogPic = dogPic : dogPic = require("./images/default-dog-img.png");

    //             //creates DOM elements and grabs the outer-most one
    //             const conversationsList = document.getElementsByClassName('conversations-list')[0];
    //             const outerDiv = document.createElement('div');
    //             const listItem = document.createElement('li');
    //             const conversationCard = document.createElement('div');
    //             const conversationCardImage = document.createElement('div');
    //             const conversationCardMainContent = document.createElement('div');
    //             const paragraph = document.createElement('p');
    //             const image = document.createElement('img');
    //             image.setAttribute('src', {dogPic});
    //             const name = document.createTextNode(dogName);

    //             //adds appropriate classes to each element
    //             conversationCard.classList.add("conversation-card");
    //             conversationCardImage.classList.add("conversation-card-image-container");
    //             conversationCardMainContent.classList.add("conversation-card-main-content");
    //             paragraph.classList.add("conversation-card-name");
    //             image.classList.add("conversation-card-image");

    //             //appends each element to its parent
    //             paragraph.appendChild(name)
    //             conversationCardMainContent.appendChild(paragraph);
    //             conversationCardImage.appendChild(image)
    //             conversationCard.appendChild(conversationCardImage);
    //             conversationCard.appendChild(conversationCardMainContent);
    //             listItem.appendChild(conversationCard);
    //             outerDiv.appendChild(listItem);
    //             conversationsList.prepend(outerDiv);
    //         }
    // }


    useEffect(() => {
        //fetches all conversations
        const fetchConversations = async () => {
            const response = await fetch(`http://localhost:8100/api/users_conversations/${profileId}`);

            //if conversations fetch successful
            if (response.ok) {
                const conversationData = await response.json();
                //store list of conversations in state
                setConversations(conversationData);

                //if fetched conversations not null
                if (conversationData) {

                    //check to see if other user's id is available and store in state
                    //this means we reached messaging through their profile
                    if (location.state.othersId) {
                        const { othersId } = location.state;
                        setOtherUserId(othersId);

                        //create variable to see if users have conversation history
                        let conversationHistory = false;
                        for (let conversation of conversationData) {
                            //selects the appropriate conversation given the other user's id 
                            if (conversation.other_user === othersId) {
                                conversationHistory = true
                                //once conversation is selected, it will render message history
                                setSelectedConversation(conversation.id);
                            }
                        }

                        //if the two users don't have conversation history, create new conversation and select it
                        if (!conversationHistory) {
                            const conversationId = await createConversation(); //creates conversation in database
                            // setSelectedConversation(conversationId) //selects conversation id, thereby opening it's chat window
                            
                            //fetch all conversations again -- including recently created one
                            const fetchConvos = async () => {
                                const response = await fetch(`http://localhost:8100/api/users_conversations/${profileId}`);
                    
                                //if conversations fetch successful
                                if (response.ok) {
                                    const conversationData = await response.json();
                                    setConversations(conversationData);
                                    setSelectedConversation(conversationId) //selects conversation id, thereby opening it's chat window
                                }
                            }
                            await fetchConvos();
                        }

                    } else {
                        console.log("other user's info not available for some reason?") //delete else when finished testing
                    }
                    //else only runs when user has no conversations
                } else {
                    console.log('conversation history does not exist...make a friend and message them') //delete else, when finished testing
                }
            }
        }
        fetchConversations();
    }, [])


    //gets all of the messages associated with the selected conversation
    useEffect(() => {
        const fetchMessages = async () => {
            console.log(selectedConversation)
            const response = await fetch(`http://localhost:8100/api/messages/${selectedConversation}`);
            if (response.ok) {
                const data = await response.json()
                setMessages(data)
            }
        }

        fetchMessages();
    }, [selectedConversation]);


    return (
        <div className="outer-messaging-container">
            <div className="messaging-container">
                <div className="conversations-container">
                    <div id="messages-header-container">
                        <h4>Messages</h4>
                    </div>
                    <Conversations
                        conversations={conversations}
                        setSelectedConversation={setSelectedConversation}
                    />
                </div>
                <div className="chat-container">
                    {!selectedConversation
                        ? <NoChat />
                        : <Chat
                            conversations={conversations}
                            selectedConversation={selectedConversation}
                            messages={messages}
                            primaryUserId={profileId}
                            otherUserId={otherUserId}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
