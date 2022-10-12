import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

export default function AuthenticateUser(props) {
    const [showSignUp, setShowSignUp] = useState(false)

    if (showSignUp) {
        return (
            <SignUp 
                setToken={props.setToken} 
                setShowSignUp={setShowSignUp} 
                setAccountId={props.setAccountId} 
            />
        )
    } else {
        return (
            <Login setToken={props.setToken} setShowSignUp={setShowSignUp} />
        )
    }
}