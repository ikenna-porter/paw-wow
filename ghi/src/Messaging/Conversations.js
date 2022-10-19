import {useEffect, useState} from 'react'
import Conversation from './Conversation'
import './style.css'

export default function Conversations(props) {
    const setSelectedConversation = props.setSelectedConversation
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            const response = await fetch('http://localhost:8200/api/conversations')
            if (response.ok) {
                const data = await response.json()
                // console.log(data)
                setConversations(data)
                // console.log(conversations)
            }
        }
        fetchConversations();
    }, [])

    const handleConversationClick = (conversation_id, e) => {
        //need to access the conversation.id - key and pass as argument ->
        setSelectedConversation(conversation_id) //changes state of parent, thereby rendering conversation
    }

    return (
        <ul className="conversations-list">
            {conversations.map(conversation => {
                return <Conversation
                    key={conversation.id}
                    onClick={handleConversationClick(conversation.id)}
                    conversation={conversation} 
                />
            })}
        </ul>
    )

}
