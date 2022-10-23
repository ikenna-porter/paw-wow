import {useEffect, useState} from 'react'

export default function Message(props) {
    const message = props.message;
    console.log(message);
    return (
        <div>
            {message.content}
        </div>
    )
}