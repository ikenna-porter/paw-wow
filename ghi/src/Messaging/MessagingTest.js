import {Fragment, useState, useEffect} from 'react';
import Conversation from './Conversation';
import Conversations from './Conversations';
import NoChat from './NoChat';
import Chat from './Chat';
import './style.css'


export default function MessagingTest(props) {
    const [loading, setLoading] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState(0)
    const [messages, setMessages] = useState([])
    const [conversations, setConversations] = useState([]);

    useEffect(() => { 

        const fetchMessages = async () => {
            const response = await fetch(`http://localhost:8200/api/messages/${selectedConversation}`)
            if (response.ok) {
                const data = await response.json()
                setMessages(data)
                console.log(messages); //empty?
            }

            // const ws = new WebSocket(`ws://localhost:8200/api/messages/${selectedConversation}`)
            // ws.addEventListener('open', () => {
            //     setConnected(true);
            //     setLoading(false);
            // });

            // ws.addEventListener('close', () => {
            //     setConnected(false);
            //     setLoading(false);
            // });
  
        }
        fetchMessages();
    }, [selectedConversation]);

    useEffect(() => {
        const fetchConversations = async () => {
            const response = await fetch('http://localhost:8200/api/conversations')
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setConversations(data)
                // console.log(conversations)
            }
        }
        fetchConversations();
    }, [])

    return (
        <div className="messaging-container">
            <div className="conversations-container">
                <Conversations 
                conversations={conversations}
                setSelectedConversation={setSelectedConversation}
                />
            </div>
            <div>
                {!selectedConversation
                ? <NoChat />
                : <Chat 
                    conversation_id={selectedConversation}
                    messages={messages}
                  />
                }
            </div>
        </div>
    )
}
