import { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('username', username)
        form.append('password', password)
        console.log("form", form)

        const url = 'http://localhost:8100/token';
        const fetchConfig = {
            method: 'POST',
            body: form,
            credentials: "include",
        }

        const response = await fetch(url, fetchConfig);
        console.log(response)
        if (response.ok) {
            const responseData = await response.json()
            props.setToken(responseData.access_token)
            setUsername('');
            setPassword('');
            navigate('/profile');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                placeholder="Username" 
                                required type="text" 
                                onChange={e => setUsername(e.target.value)} 
                                value={username}
                            />
                            <label className="form-label" htmlFor="username">Username</label>
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Password" 
                                required type="password" 
                                onChange={e => setPassword(e.target.value)} 
                                value={password}
                            />
                            <label className="form-label" htmlFor="password">Password</label>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-primary mb-2"
                        >
                            Login
                        </button>
                    </form>
                    <button
                        onClick={() => props.setShowSignUp(true)}
                        type="button"
                        style={{all: 'unset',}}
                        className="login-signup-toggle"
                    >
                        Don't have an account? Create one
                    </button> 
                </div>
            </div>
        </div>
    )
}