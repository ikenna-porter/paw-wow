import { useState } from 'react'

export default function Login(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password: password
        }
        console.log("data:", data)
        const url = 'http://localhost:8100/token';
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfig);
        console.log(response)
        if (response.ok) {
            console.log(response)
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