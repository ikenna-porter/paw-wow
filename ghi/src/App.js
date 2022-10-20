import { useState, Component, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
import Vaccinations from './Profile/Vaccinations'
import VaccinationsModal from './Profile/VaccinationsModal'
import Characteristics from './Profile/Characteristics'
import CharsModal from './Profile/CharacteristicsModal'
import EditProfileModal from './Profile/EditProfileModal'

export default function App() {
  const [accountId, setAccountId] = useState('');
  const [username, setUsername] = useState('');
  const [profileId, setProfileId] = useState('');
  //const client = new WebSocket('ws://localhost:8300/api/notifications');
  
    // useEffect(() =>{
    //   client.onopen = () => {
    //     console.log('WebSocket Client Connected');
    //   };
    //   client.onmessage = (message) => {
    //     console.log(message);
    //   }
    // },[client]);

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
          <Route path="edot-profile" element={<EditProfileModal />} />
          <Route path="vaccinations" element={<Vaccinations />} />
          <Route path="create-vaccinations" element={<VaccinationsModal profileId={profileId} />} />
          <Route path="edit-vaccinations" element={<VaccinationsModal profileId={profileId} />} />
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="create-characteristics" element={<CharsModal profileId={profileId} />} />
          <Route path="edit-characteristics" element={<CharsModal profileId={profileId} />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
        }
