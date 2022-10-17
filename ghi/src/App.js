import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
// import MessagingTest from './Messaging/MessagingTest'
import Conversations from './Messaging/Conversations'
import Vaccinations from './Profile/Vaccinations'
import VaccinationsModal from './Profile/VaccinationsModal'
import Characteristics from './Profile/Characteristics'
import CreateChars from './Profile/CreateChars'
import MessagingTest from './Messaging/MessagingTest'


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
                                />} />
        {/* <Route path="create-profile" element={<CreateProfile token={token} accountId={accountId} />} />
        <Route path="profile" element={<Profile />} /> */}
        <Route path="create-profile" element={<CreateProfile 
                                                accountId={accountId} 
                                                setProfileId={setProfileId}
                                              />} 
        />
        <Route path="profile">
          <Route index element={<Profile profileId={profileId} />} />
          <Route path="vaccinations" element={<Vaccinations />} />
          <Route path="create-vaccinations" element={<VaccinationsModal profileId={profileId} />} />
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="create-characteristics" element={<CreateChars profileId={profileId} />} />
        </Route>
        <Route path="messaging" element={<MessagingTest />} />
        <Route path="conversations" element={<Conversations />} />
      </Routes>
    </BrowserRouter>
  )
}
