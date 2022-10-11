import MainPage from "./MainPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import SignUpForm from "./Profile/SignUpForm"

export default function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}
