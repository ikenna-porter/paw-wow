import {useState, useEffect} from 'react';
import { useParams, useLocation } from "react-router-dom";
import Conversation from './Conversation';
import Conversations from './Conversations';
import NoChat from './NoChat';
import Chat from './Chat';
import './style.css';
// import {ReconnectingWebSocket} from './reconnectWebsocket';

export default function MessagingTest(props) {
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(0);
    const [messages, setMessages] = useState(['']);
    const [conversations, setConversations] = useState([]);
    const location = useLocation();
    const [otherUserId, setOtherUserId] = useState(0);
    const profileId = localStorage.getItem('profileId');
    const username = localStorage.getItem('currentUser');


    const createConversation = async () => {
        const userIds = {
            primary_user: parseInt(profileId),
            other_user: otherUserId
        }
        const url = "http://localhost:8100/api/conversations";
        const fetchConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: "POST",
            mode: "cors",
            body: JSON.stringify(userIds)
        }

        //fetch to create conversation
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            console.log(response);
            console.log(response.json)
        }
    }
    

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
                        const {othersId} = location.state;
                        setOtherUserId(othersId);

                        //create variable to see if users have conversation history
                        let conversationHistory = false
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
                            const newConversation = createConversation();
                            console.log(newConversation);
                            setSelectedConversation(newConversation.id);
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
