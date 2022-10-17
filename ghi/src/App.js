import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'
import Profile from './Profile/Profile'
import ListFriends from './Friendship/FriendList'


export default function App() {
  const [token, setToken] = useState('')
  const [accountId, setAccountId] = useState('')
  const [username, setUsername] = useState('')

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<AuthenticateUser 
                                  setToken={setToken} 
                                  setAccountId={setAccountId} 
                                  setUsername={setUsername}
                                />} />
        <Route path="create-profile" element={<CreateProfile token={token} accountId={accountId} />} />
        <Route path="profile" element={<Profile />} />
        <Route path='list-friends' element={<ListFriends />} />
      </Routes>
    </BrowserRouter>
  )
}
