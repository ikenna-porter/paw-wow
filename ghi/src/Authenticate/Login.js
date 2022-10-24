import { useState } from 'react'
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

    const url = 'http://localhost:8100/token';
    const fetchConfig = {
        method: 'POST',
        body: form,
        credentials: "include",
    }

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('currentUser', `${username}`)
        setUsername('');
        setPassword('');
        navigate('/profile');
    }

    const getToken = await fetch('http://localhost:8100/token', {credentials: 'include'});
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
                      <h3 className='mb-4'>Log In</h3>
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
                  <button type="submit" className="form-control btn btn-primary rounded submit px-3">Login</button>
                    </div>

                  </form>

                  <p className="text-center">Don't have an account? <a data-toggle="tab" href="#signup" onClick={() => props.setShowSignUp(true)}>Create one!</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>  
  )
}