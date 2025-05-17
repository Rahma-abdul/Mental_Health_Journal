import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import History from './pages/History.jsx'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      // <div>
      //   {/* <h1>Mental Health Journal</h1> */}
      //   <Login></Login>
      // </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
  );
}

export default App
