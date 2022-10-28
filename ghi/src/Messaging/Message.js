import { useEffect, useState } from 'react'

export default function Message(props) {
    const message = props.message;

    return (
        <div className="message-container">
            <div className='message-text'>{message.content}</div>
            <div className='message-timestamp'>{message.timestamp}</div>
        </div>
    )
}