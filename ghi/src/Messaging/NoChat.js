export default function NoChat() {
    return (
        <div id="no-chat-container">
        <img src={require("./images/inbox.png")} alt="" id="no-chat-image"/>
            <div>
                <p id="no-chat-text">Choose a conversation from the left.</p>
            </div>
        </div>
    )
}