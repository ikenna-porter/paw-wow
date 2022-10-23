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
      localStorage.setItem('currentUser', `${username}`)
      navigate("/create-profile");
    }

    const tokenUrl = await fetch('http://localhost:8100/token', {credentials: 'include'});

  }

  return (
    <section className='ftco-section'>
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
              <div className='wrap'>
                <div className='flex-img'>
                  <img src={require('../Images/pawow.png')} alt='paw wow logo'/>
                </div>

                  <div className='login-wrap p-4 p-md-5'>
                    <div className='d-flex'>
                      <div className='w-100'>
                        <h3 className='mb-4'>Sign Up</h3>
                      </div>

                    </div>

                    <form onSubmit={handleSubmit} className='signin-form'>
                    <div className="form-group mt-3">
                      <input type="text" className="form-control" onChange={e => setUsername(e.target.value)} 
                    value={username} required/>
                        <label className="form-control-placeholder" htmlFor="username">Username</label>
                    </div>

                    <div className="form-group">
                    <input id="password-field" type="password" className="form-control" required onChange={e => setPassword(e.target.value)} 
                    value={password}/>
                    <label className="form-control-placeholder" htmlFor="password">Password</label>
                    </div>

                    <div className="form-group">
                    <button type="signup-submit" className="form-control btn btn-primary rounded submit px-3">Sign Up</button>
                      </div>

                    </form>

                    <p className="text-center">Not a member? <a data-toggle="tab" href="#signup" onClick={() => props.setShowSignUp(false)}>Sign Up</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
  )
}