import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
<<<<<<< HEAD
import Vaccinations from './Profile/Vaccinations'
import VaccinationsModal from './Profile/VaccinationsModal'
import Characteristics from './Profile/Characteristics'
import CreateChars from './Profile/CreateChars'
=======
import ListFriends from './Friendship/FriendList'
>>>>>>> 46af13ce31cdb8e22525fc7ef481e0ae404bdf57


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
<<<<<<< HEAD
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
          <Route path="create-vaccinations" element={<VaccinationsModal profileId={profileId} />} />
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="create-characteristics" element={<CreateChars profileId={profileId} />} />
        </Route>  
=======
                                />} />
        <Route path="create-profile" element={<CreateProfile token={token} accountId={accountId} />} />
        <Route path="profile" element={<Profile />} />
        <Route path='list-friends' element={<ListFriends />} />
>>>>>>> 46af13ce31cdb8e22525fc7ef481e0ae404bdf57
      </Routes>
    </BrowserRouter>
  )
}
