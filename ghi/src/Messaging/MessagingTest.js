import {Fragment, useState} from 'react';
import Conversation from './Conversation';
import Conversations from './Conversations';
import NoConversation from './NoConversation';


export default function MessagingTest(props) {
    const [loading, setLoading] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState(0)

    return (
        <div>
            <div>
                <Conversations setSelectedConversation={setSelectedConversation}/>
            </div>
            <div>
                {selectedConversation === 0
                ? <Conversation conversation_id={selectedConversation}/>
                : <NoConversation />
                }
            </div>
        </div>
    )
}
