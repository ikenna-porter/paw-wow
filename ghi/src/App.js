import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
import Vaccinations from './Profile/Vaccinations'
import CreateVaccinations from './Profile/CreateVaccinations'


export default function App() {
  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [username, setUsername] = useState('');
  const [profileId, setProfileId] = useState('');

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<AuthenticateUser 
                                  setToken={setToken} 
                                  setAccountId={setAccountId} 
                                  setUsername={setUsername}
                                />} 
        />
        <Route path="create-profile" element={<CreateProfile 
                                                token={token} 
                                                accountId={accountId} 
                                                setProfileId={setProfileId}
                                              />} 
        />
        <Route path="profile">
          <Route index element={<Profile profileId={profileId} />} />
          <Route path="vaccinations" element={<Vaccinations />} />
          <Route path="create-vaccinations" element={<CreateVaccinations />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}
