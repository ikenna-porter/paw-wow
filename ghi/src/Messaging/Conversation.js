import {useEffect, useState} from 'react'

export default function Conversation(props) {
    const conversation = props.conversation
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    return (

        // <li onClick={handleConversationClick} key={conversation.id}>
                //     <div>
                //         {/* need to access other user's picture url: */}
                //         <div>{conversation.other_user}</div> 
                //         {/* need to access other user's name: */}
                //         <div>{conversation.other_user}</div>
                //         <div>{conversation.last_message}</div>
                //     </div>
                // </li>

        <li>
            <div className="conversation-card">
                <div className="conversation-card-image-container">
                    <img className="conversation-card-image" src="https://www.collinsdictionary.com/images/full/dog_230497594.jpg" alt="" />
                </div>
                <div className="conversation-card-main-content">
                    <p className="conversation-card-name">{conversation.other_user}</p>
                    <p className="conversation-card-text">{conversation.last_message}</p>
                </div>
            </div>
        </li>
    )
}