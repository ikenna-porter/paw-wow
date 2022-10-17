import {useEffect, useState} from 'react'

export default function Conversations(props) {
    const setSelectedConversation = props.setSelectedConversation
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            const response = await fetch('http://localhost:8200/api/conversations')
            if (response.ok) {
                const data = await response.json()
                setConversations(...data)
                console.log(conversations)
            }
        }
        fetchConversations();
    }, [])

    const handleConversationClick = e => {
        //need to access the conversation.id - key and pass as argument ->
        setSelectedConversation() //changes state of parent, thereby rendering conversation
    }

    return (
        // <ul>
        //     {conversations.map( conversation => {
        //         <li onClick={handleConversationClick} key={conversation.id}>
        //             <div>
        //                 <div>{conversation.other_user.picture_url}</div>
        //                 <div>{conversation.other_user.name}</div>
        //                 <div>{conversation.last_message}</div>
        //             </div>
        //         </li>
        //     })}
        // </ul>
        <div>testing</div>
    )

}
