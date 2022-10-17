import {useEffect, useState} from 'react'

export default function Conversation(props) {
    const conversation_id = props.conversation_id;
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

   // useEffect(() => { 

    //     const fetchConversation = () => {
    //         // retrieves messages for conversation
    //         const url = `http://localhost:8200/api/conversations/${conversation_id}`

    //         const ws = new WebSocket(`ws://localhost:8200/api/conversations/${conversation_id}`)
    //         ws.addEventListener('open', () => {
    //             setConnected(true);
    //             setLoading(false);
    //         });

    //         ws.addEventListener('close', () => {
    //             setConnected(false);
    //             setLoading(false);
    //         });
    //     }

    //     fetchConversation();
    // }), [];


    return (
        <div>
            <div>
                test conversations
            </div>
        </div>
    )
}