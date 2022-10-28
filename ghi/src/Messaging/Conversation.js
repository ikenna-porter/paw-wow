export default function Conversation(props) {
    const conversation = props.conversation;

    return (
        <li>
            <div className="conversation-card">
                <div className="conversation-card-image-container">
                    <img className="conversation-card-image" src={conversation.other_user_picture} alt="Camera Shy" />
                </div>
                <div className="conversation-card-main-content">
                    <p className="conversation-card-name">User: {conversation.other_user_dog_name}</p>
                </div>
            </div>
        </li>
    )
}