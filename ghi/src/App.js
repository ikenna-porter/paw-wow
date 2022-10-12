import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import AuthenticateUser from './Authenticate/AuthenticateUser'
import CreateProfile from './Profile/CreateProfile'


export default function App() {
  const [token, setToken] = useState('')
  const [accountId, setAccountId] = useState('')

  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<AuthenticateUser setToken={setToken} setAccountId={setAccountId} />} />
        <Route path="create-profile" element={<CreateProfile token={token} accountId={accountId} />} />
      </Routes>
    </BrowserRouter>
  )
}
