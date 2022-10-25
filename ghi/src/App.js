import { useState, Component, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
import MessagingTest from './Messaging/MessagingTest'
import Conversations from './Messaging/Conversations'
import Vaccinations from './Profile/Vaccinations'
import VaccinationsModal from './Profile/VaccinationsModal'
import Characteristics from './Profile/Characteristics'
import CharsModal from './Profile/CharacteristicsModal'
import EditProfileModal from './Profile/EditProfileModal'
import ListFriends from './Friendship/FriendList'
import PendingList from './Friendship/PendingList'
import SearchBar from './SearchBar/SearchBar'
import OtherProfile from './OtherProfile/OtherProfile'

export default function App() {
<<<<<<< HEAD

=======
>>>>>>> 18fff13aadd17f74c1c1dd2cd21d721b974f8f7e
    const [resize, setResize] = useState(false)
  
    return (
    <BrowserRouter>
    <div id="static">
      <Nav resize={resize} setResize={setResize}/>
      </div>
      <div id="content" style={{paddingLeft:resize ? "0px": "270px"}}>
      <Routes>
        <Route path="/" element={<AuthenticateUser />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="messages" element={<MessagingTest />} />
        <Route  path="profile">
          <Route index element={<Profile />} />
          <Route path="edit-profile" element={<EditProfileModal />} />
          <Route path="vaccinations" element={<Vaccinations />} />
          <Route path="create-vaccinations" element={<VaccinationsModal />} />
          <Route path="edit-vaccinations" element={<VaccinationsModal />} />
          <Route path="characteristics" element={<Characteristics />} />
          <Route path="create-characteristics" element={<CharsModal />} />
          <Route path="edit-characteristics" element={<CharsModal />} />
          <Route path='friends' element={<ListFriends />} />
          <Route path="pending" element={<PendingList />} />
          <Route path=":id" element={<OtherProfile />} />
        </Route>
        <Route path="search" element={<SearchBar />} />

      </Routes>
      </div>
    </BrowserRouter>
  )
        }
