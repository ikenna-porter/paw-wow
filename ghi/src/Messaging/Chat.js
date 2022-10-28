import { useState, useEffect } from 'react'
import { ReconnectingWebSocket } from './reconnectWebsocket';
import Message from './Message'

export default function Chat(props) {
    const messages = props.messages;
    const conversations = props.conversations;
    const otherUserId = props.otherUserId;
    const primaryUserId = props.primaryUserId;
    const selectedConversation = props.selectedConversation;
    const [ws, setWs] = useState(new WebSocket(`ws://localhost:8100/ws/conversations/${selectedConversation}`));
    let selectedUser = null;


    useEffect(() => {
        console.log(ws.readyState)

        ws.addEventListener('message', event => {
            //retrieves list of messages
            const previousMessages = document.getElementById('messages');

            //creates outer-most message container div and adds appropriate class to it
            const recentMessage = document.createElement('div');
            recentMessage.classList.add("message-container");

            //Takes in message data and extracts out text and dates
            const messageText = JSON.parse(event.data).content;
            const messageDate = JSON.parse(event.data).timestamp;

            //creates text/date divs to go inside of recentMessage
            const textDiv = document.createElement("div");
            const dateDiv = document.createElement("div");

            //creates text nodes, appends them to corresponding divs and adds corresponding classes
            const textTextContent = document.createTextNode(messageText);
            const dateTextContent = document.createTextNode(messageDate); //NEED TO CHANGE THE FORMAT OF DATE
            textDiv.append(textTextContent);
            dateDiv.append(dateTextContent);
            textDiv.classList.add("message-text");
            dateDiv.classList.add("message-timestamp");

            //appends text and date divs to message-container
            recentMessage.appendChild(textDiv);
            recentMessage.appendChild(dateDiv);

            // recentMessage.appendChild(messageText);
            previousMessages.appendChild(recentMessage);

            updateScroll();
        },);
    }, []);



    // //closes WebSocket when a new conversation is selected
    // useEffect(() => {
    //     ws.close();
    //     console.log('websocket closed')
    // }, [selectedConversation]);

    useEffect(() => {
        updateScroll();
    })

    const handleSubmission = (e) => {
        e.preventDefault();

        //chooses the correct user, depending on how messaging was accessed:
        //if accessed through navbar:
        for (let conversation of conversations) {
            if (conversation.id === selectedConversation) {
                selectedUser = conversation.other_user;
            }
        }

        let recipientInput = null;
        selectedUser ? recipientInput = selectedUser : recipientInput = otherUserId

        const message = document.querySelector("#chat-input");
        const input = {
            sender: primaryUserId,
            recipient: recipientInput,
            timestamp: Date.now(),
            content: message.value,
            conversation_id: selectedConversation
        }

        ws.send(JSON.stringify(input));

        updateScroll();
    }

    //Keeps chat scrolled at the bottom
    const updateScroll = () => {
        const element = document.querySelector("#messages-container");
        element.scrollTop = element.scrollHeight;
    }

    return (
        <div id="messages-form-container">
            <div id="messages-container">
                <ul id="messages">
                    {messages.map(message => {
                        return <Message
                            key={message.id}
                            message={message}
                        />
                    })}
                </ul>
            </div>
            <form onSubmit={e => handleSubmission(e)} id="form-container">
                <input
                    id="chat-input"
                    type="text"
                    placeholder="Message..."
                    autoComplete="off"
                    required
                />
                <div id="button-container">
                    <button type="submit" className="btn btn-success" id="btn">Send</button>
                </div>
            </form>
        </div>

    )
}