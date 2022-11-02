export default function Conversation(props) {
    const conversation = props.conversation;

    return (
        <li>
            <div className="conversation-card">
                <div className="conversation-card-image-container">
                    <img className="conversation-card-image" 
                        src={
                            conversation.other_user_picture
                            ? conversation.other_user_picture
                            : require("./images/default-dog-img.png")
                        } />
                </div>
                <div className="conversation-card-main-content">
                    <p className="conversation-card-name">{conversation.other_user_dog_name}</p>
                </div>
            </div>
        </li>
    )
}