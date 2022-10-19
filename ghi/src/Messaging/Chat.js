import {useState, useEffect} from 'react'
import Message from './Message'

export default function Chat(props) {
    const messages = props.messages
    console.log(messages)

    return(
        <div>
            {messages.map(message => {
                return <Message
                    key={message.id}
                    message={message}
                />
            })}
            
        </div>
        
    )
}