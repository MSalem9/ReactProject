import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login.jsx'
import Signup from './pages/Singup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UserDetails from './pages/UserDetails.jsx'
import EditPost from './pages/EditPost.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<App/>} />
     <Route path="/login" element={<Login/>} />
     <Route path="/signup" element={<Signup/>} />
     <Route path="/Dashboard" element={<Dashboard/>}/>
     <Route path="/edit/:id" element={<EditPost />} />
     
     <Route path = "Dashboard">
      <Route index element = {<Dashboard/>}/>
      <Route path = "UserDetails" element={<UserDetails/>}/>
      <Route path = "CreatePost" element={<CreatePost/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
