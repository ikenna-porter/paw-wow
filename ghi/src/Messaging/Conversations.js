import { useEffect, useState } from 'react'
import Conversation from './Conversation'
import './style.css'

export default function Conversations(props) {
    const conversations = props.conversations
    const setSelectedConversation = props.setSelectedConversation
    const [loading, setLoading] = useState(true);

    //Function should change state of parent, thereby rendering a new chat window 
    const handleConversationClick = (conversation_id) => {
        setSelectedConversation(conversation_id)
    }

    if (conversations.length === 0) {
        return <>Loading Conversations</>
    }

    return (
        <ul className="conversations-list">
            {conversations.map(conversation => {
                return (
                    <div key={conversation.id} onClick={e => handleConversationClick(conversation.id)}>
                        <Conversation
                            conversation={conversation}
                        />
                    </div>
                )
            })}
        </ul>
    )

}
