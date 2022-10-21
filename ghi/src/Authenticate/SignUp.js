import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username:username, 
      password:password
    };
    
    const url = 'http://localhost:8100/api/accounts';

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }

    const accountResponse = await fetch(url, fetchConfig);
    if (accountResponse.ok) {
      const accountData = await accountResponse.json();
      console.log("accountData", accountData)
      // accountData has access_token, account{id, username}
      console.log(document.cookie)
      props.setAccountId(accountData.account.id)
      props.setCurrentUser(accountData.account.username)
      navigate("/create-profile");
    }

    const tokenUrl = await fetch('http://localhost:8100/token', {credentials: 'include'});
    console.log("token response", tokenUrl)

  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Sign Up Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">Username</label>
              <input
                placeholder="Username" 
                required 
                type="text" 
                onChange={e => setUsername(e.target.value)} 
                value={username}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                placeholder="Password" 
                required 
                type="password" 
                onChange={e => setPassword(e.target.value)} 
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-2">Sign Up</button>
          </form>
          <button
            onClick={() => props.setShowSignUp(false)}
            type="button"
            style={{all: 'unset',}}
            className="login-signup-toggle"
          >
            Already have an account? Login!
          </button> 
        </div>
      </div>
    </div>
  )
}