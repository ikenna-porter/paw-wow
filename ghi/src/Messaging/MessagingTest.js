import {useState, useEffect} from 'react';
import { useParams, useLocation } from "react-router-dom"
import Conversation from './Conversation';
import Conversations from './Conversations';
import NoChat from './NoChat';
import Chat from './Chat';
import './style.css'
// import {ReconnectingWebSocket} from './reconnectWebsocket';

export default function MessagingTest(props) {
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(0)
    const [messages, setMessages] = useState([''])
    const [conversations, setConversations] = useState([]);
    const location = useLocation()
    const [otherUserId, setOtherUserId] = useState(0);
    const profileId = localStorage.getItem('profileId')
    const username = localStorage.getItem('currentUser')

    //defines function to fetch all of user's conversations
    // const fetchConversations = async () => {
    //     const response = await fetch(`http://localhost:8100/api/users_conversations/${profileId}`);
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setConversations([data])
    //     }
    // }

    useEffect(() => {
        const fetchConversations = async () => {
            const response = await fetch(`http://localhost:8100/api/users_conversations/${profileId}`);
            if (response.ok) {
                const data = await response.json()
                setConversations(data)
            }
        }
        fetchConversations();
    }, [])

    //grabs profile ID of other user when the "message" button is selected in the other user's profile
    useEffect(() => {

        //runs when component is reached from a user's profile
        try { 
            //takes other user's profileId and stores it in state as otherUserId
            const {othersId} = location.state;
            console.log(othersId);
            setOtherUserId(othersId);

            //fetches all of user's conversations
            // fetchConversations();
            
            // if conversation exist, opens the appropriate one
            for (let conversation of conversations) {
                if (conversation.other_user === othersId) {
                    setSelectedConversation(conversation.id); //will cause component to rerender 
                }
            }

            //if it makes it this far, component didn't rerender
            //now we have to create a conversation since it didn't exist
            const createConversation = async () => {

                //defines variables needed to perform fetch
                const userIds = {
                    primary_user: parseInt(profileId),
                    other_user: othersId
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
                    console.log('conversation created');
                }
            }

            // createConversation();
            
        } catch (TypeError) { //runs when messaging component is reached from nav bar
            console.log('Message functionality accessed through Nav Bar');
        }

    },[])

    
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
                        // setUsersLastMessage={setUsersLastMessage}
                        selectedConversation={selectedConversation}
                        messages={messages}
                      />
                    }
                </div>
            </div>
        </div>
    )
}
