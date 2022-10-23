import {useEffect, useState} from 'react'

export default function Conversation(props) {
    const conversation = props.conversation
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <li>
            <div className="conversation-card">
                <div className="conversation-card-image-container">
                    <img className="conversation-card-image" src="https://www.collinsdictionary.com/images/full/dog_230497594.jpg" alt="" />
                </div>
                <div className="conversation-card-main-content">
                    <p className="conversation-card-name">User: {conversation.other_user}</p>
                    <p className="conversation-card-text">Last Message: {conversation.last_message}</p>
                </div>
            </div>
        </li>
    )
}