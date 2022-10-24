import {Fragment, useState, useEffect} from 'react';
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
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState([]);
    // const [usersLastMessage, setUsersLastMessage] = useState("");

    const connect = () => {
        if (loading && !connected) {
            return;
        }
    }

    useEffect(() => { 

        const fetchMessages = async () => {
            const response = await fetch(`http://localhost:8100/api/messages/${selectedConversation}`)
            if (response.ok) {
                const data = await response.json()
                setMessages(data)
            }

            // ws.addEventListener('open', (e) => {
            //     console.log(e)
            //     setConnected(true);
            //     setLoading(false);
            //     console.log('*********','opened')
            // });

            // ws.addEventListener('close', (e) => {
            //     console.log(e)
            //     setConnected(false);
            //     setLoading(false);
            //     setTimeout(() => connect(), 1000);
            // });

            // ws.addEventListener('error', (e) => {
            //     console.log(e)
            //     setConnected(false);
            //     setLoading(false);
            //     setTimeout(() => connect(), 1000);
            // });

            // ws.addEventListener('message', message => {
            //     console.log(message)
            //     //Retains old messages while adding new message data to state
            //     setMessages(messages => [...messages, JSON.parse(message.data)]);
            // });
  
        }
        fetchMessages();
    }, [selectedConversation]);

    useEffect(() => {
        const fetchConversations = async () => {
            const response = await fetch('http://localhost:8100/api/conversations')
            if (response.ok) {
                const data = await response.json()
                setConversations(data)
            }
        }
        fetchConversations();
    }, [])

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
