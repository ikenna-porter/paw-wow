import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
import Vaccinations from './Profile/Vaccinations'
import CreateVaccinations from './Profile/CreateVaccinations'
import Characteristics from './Profile/Characteristics'
import CreateChars from './Profile/CreateChars'


export default function App() {
  const [accountId, setAccountId] = useState('');
  const [username, setUsername] = useState('');
  const [profileId, setProfileId] = useState('');

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<AuthenticateUser 
                                  setAccountId={setAccountId} 
                                  setUsername={setUsername}
                                />} 
        />
        <Route path="create-profile" element={<CreateProfile 
                                                accountId={accountId} 
                                                setProfileId={setProfileId}
                                              />} 
        />
        <Route path="profile">
          <Route index element={<Profile profileId={profileId} />} />
          <Route path="vaccinations" element={<Vaccinations />} />
          <Route path="create-vaccinations" element={<CreateVaccinations profileId={profileId} />} />
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="create-characteristics" element={<CreateChars profileId={profileId} />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}
