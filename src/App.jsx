import React from 'react'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import Posts from './components/Posts'
function App() {
  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/post" element={<Posts/>}></Route>
    </Routes>
      
    </>
  )
}

export default App
