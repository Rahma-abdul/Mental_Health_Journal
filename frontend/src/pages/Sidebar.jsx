import React, { useState } from 'react';
import { Clock, CalendarDays, ListTodo, Clipboard, ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar( {children}) {
  const [isOpen, setIsOpen] = useState(true); 
 const navigate = useNavigate();
  const handleLogout = () => {

    navigate("/login");
  };

  return (
    <div className='flex min-h-screen transition-all duration-300'>
      {/* Toggle Button on top-right */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button> */}

      {/* Sidebar */}
      {/* <aside
        className={`fixed top-0 left-0 z-40 w-56 h-screen transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } text-white bg-[#ffd4c6]`} 
        aria-label="Sidebar"
      > */}

      <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out ${
        isOpen ? 'w-40' : 'w-12'
      } text-white bg-[#ffd4c6]`}
      aria-label="Sidebar"
      >

        <button
          onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-5 z-50 p-1 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 shadow-md border-2 border-[#ffd4c6]"
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

        <div className="h-full px-2 py-4 overflow-y-auto">
          <ul className="space-y-5 font-medium">
            <li>
              <NavLink to='/history' className="flex items-center p-2 rounded-lg hover:bg-white/5 group justify-center md:justify-start">
                <Clock className='w-5 h-5 text-gray-800'/> 
                <span className={`flex-1 ms-3 whitespace-nowrap text-gray-800 ${!isOpen && 'hidden'}`}>History</span> 
            </NavLink>
            </li>
            <li>
              <NavLink to='/daily' className="flex items-center p-2 rounded-lg hover:bg-white/5 group justify-center md:justify-start">
                <Clipboard className='w-5 h-5 text-gray-800'/> 
                <span className={`flex-1 ms-3 whitespace-nowrap text-gray-800 ${!isOpen && 'hidden'}`}>Daily Entry</span> 
              </NavLink>
            </li>
            <li>
              <NavLink to='/todo' className="flex items-center p-2 rounded-lg hover:bg-white/5 group justify-center md:justify-start">
                <ListTodo className='w-5 h-5 text-gray-800'/> 
                <span className={`flex-1 ms-3 whitespace-nowrap text-gray-800 ${!isOpen && 'hidden'}`}>To Do</span> 
              </NavLink>
            </li>
            <li>
              <NavLink to='/calender' className="flex items-center p-2 rounded-lg hover:bg-white/5 group justify-center md:justify-start">
                <CalendarDays className='w-5 h-5 text-gray-800'/> 
                <span className={`flex-1 ms-3 whitespace-nowrap text-gray-800 ${!isOpen && 'hidden'}`}>Calendar</span> 
              </NavLink>
            </li>
          </ul>
           <button onClick={handleLogout} className="flex items-center  bg-[#ffd4c6] p-2 mt-8 rounded-lg hover:bg-white/5 justify-center md:justify-start">
            <LogOut className="w-5 h-5 text-gray-800" />
            <span className={`ms-3 text-gray-800 ${!isOpen && 'hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${
        isOpen ? 'ml-40' : 'ml-12'
      }`}>
        {children}
      </main>
      
    </div>
  );
}
