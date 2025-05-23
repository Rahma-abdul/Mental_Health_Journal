import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import History from './pages/History.jsx'
import Daily from './pages/Daily.jsx'
import Todo from './pages/Todo.jsx'
import Calendar from './pages/Calendar.jsx'

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
          <Route path="/daily" element={<Daily/>} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/logout" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App
