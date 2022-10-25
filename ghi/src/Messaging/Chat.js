import {useState, useEffect} from 'react'
import {ReconnectingWebSocket} from './reconnectWebsocket';
import Message from './Message'

export default function Chat(props) {
    const messages = props.messages;
    const selectedConversation = props.selectedConversation
    const [currentMessage, setCurrentMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('false');
    let ws = new WebSocket(`ws://localhost:8100/ws/conversations/${selectedConversation}`);
    // const setUsersLastMessage = props.setUsersLastMessage;
    
    ws.addEventListener('message', event => {
        console.log('received message');

        //retrieves list of messages
        const previousMessages = document.getElementById('messages');

        //creates outer-most div and adds appropriate class to it
        const recentMessage = document.createElement('div');
        recentMessage.classList.add("message-container");

        //Takes in message data and extracts out text and dates
        const messageData = JSON.parse(event.data).content;
        const messageText = JSON.parse(messageData).content;
        const messageDate = JSON.parse(messageData).timestamp;
        
        // const content = document.createTextNode(messageText)
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
    });
    
    ws.addEventListener('close', () => {
        console.log('Websocket closed')
    });


    // useEffect(() => {

    //     ws.addEventListener('close', (e) => {
    //         console.log(e)
    //     });
    //     const ws = new ReconnectingWebSocket(`ws://localhost:8200/ws/conversations/${selectedConversation}`)
    //     console.log("connected to conversation#", selectedConversation)

    //     ws.addEventListener('message', event => {
    //         // console.log(usersLastMessage);
    //         // console.log(selectedConversation);
    //         const messages = document.getElementById('messages')
    //         const message = document.createElement('li')
    //         const content = document.createTextNode(event.data)
    //         console.log(content)
    //         message.appendChild(content)
    //         messages.appendChild(message)
    //     });

    //         setFormSubmitted('false');
    // }, [selectedConversation, formSubmitted]);

    useEffect(() => {
        updateScroll();
    })

    const handleSubmission = (e) => {
        e.preventDefault();
        // setUsersLastMessage(message_content);
        const message = document.querySelector("#chat-input");
        const input = {
            sender: 2,
            recipient: 1,
            timestamp: Date.now(),
            content: message.value,
            read: false,
            conversation_id: selectedConversation 
        }

        ws.send(JSON.stringify(input));
        updateScroll();
        // setCurrentMessage('');
        // setFormSubmitted('true');
    }

    //Keeps chat scrolled at the bottom
    const updateScroll = () => {
        const element = document.querySelector("#messages-container");
        element.scrollTop = element.scrollHeight;
    }

    return(
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