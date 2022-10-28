import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'

export default function AuthenticateUser(props) {
    const [showSignUp, setShowSignUp] = useState(false);

    if (showSignUp) {
        return (
            <SignUp setShowSignUp={setShowSignUp} />
        )
    } else {
        return (
            <Login setShowSignUp={setShowSignUp} />
        )
    }
}