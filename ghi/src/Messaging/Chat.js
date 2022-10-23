import {useState, useEffect} from 'react'
import {ReconnectingWebSocket} from './reconnectWebsocket';
import Message from './Message'

export default function Chat(props) {
    const messages = props.messages;
    const selectedConversation = props.selectedConversation
    const [currentMessage, setCurrentMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('false');
    let ws = new WebSocket(`ws://localhost:8200/ws/conversations/${selectedConversation}`);
    // const setUsersLastMessage = props.setUsersLastMessage;
    
    ws.addEventListener('message', event => {
        const previousMessages = document.getElementById('messages')
        const recentMessage = document.createElement('li')
        const message_data = JSON.parse(event.data).content;
        const message_text = JSON.parse(message_data).content;
        const content = document.createTextNode(message_text)
        recentMessage.appendChild(content)
        previousMessages.appendChild(recentMessage)
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

    const handleSubmission = (e) => {
        e.preventDefault();
        // setUsersLastMessage(message_content);
        const message = document.querySelector("#chat-input");
        const input = {
            sender: 1,
            recipient: 2,
            timestamp: Date.now(),
            content: message.value,
            read: false,
            conversation_id: selectedConversation 
        }

        ws.send(JSON.stringify(input));
        // setCurrentMessage('');
        // setFormSubmitted('true');
    }

    return(
        <div id="messages-container">
            <ul id='messages'>
                {messages.map(message => {
                    return <Message
                        key={message.id}
                        message={message}
                    />
                })}
            </ul>
            <form 
                onSubmit={e => handleSubmission(e)}
            >
                <input
                    id="chat-input" 
                    type="text"
                    placeholder="Message..." 
                    required 
                    // onChange={e => setCurrentMessage(e.target.value)}
                    // value={currentMessage}
                />
                <div id="button-container">
                    <button type="button" class="btn btn-success" id="btn">Send</button>
                </div>
            </form>
            
        </div>
        
    )
}