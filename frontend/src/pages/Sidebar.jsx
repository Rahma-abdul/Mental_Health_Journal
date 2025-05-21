import React, { useState } from 'react';
import { Clock, CalendarDays, ListTodo, Clipboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); 

  return (
    <>
      {/* Toggle Button on top-right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-56 h-screen transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } text-white bg-[#ffd4c6]`} 
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink to='/history' className="flex items-center p-2 rounded-lg hover:bg-white/5 group">
                <Clock className="w-5 h-5 text-gray-800" /> 
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-800">History</span> 
              </NavLink >
            </li>
            <li>
              <NavLink to='/daily' className="flex items-center p-2 rounded-lg hover:bg-white/5 group">
                <Clipboard className="w-5 h-5 text-gray-800" /> 
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-800">Daily Entry</span> 
              </NavLink>
            </li>
            <li>
              <NavLink to='/todo' className="flex items-center p-2 rounded-lg hover:bg-white/5 group">
                <ListTodo className="w-5 h-5 text-gray-800" /> 
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-800">To do</span> 
              </NavLink>
            </li>
            <li>
              <NavLink to='/calender' className="flex items-center p-2 rounded-lg hover:bg-white/5 group">
                <CalendarDays className="w-5 h-5 text-gray-800" /> 
                <span className="flex-1 ms-3 whitespace-nowrap text-gray-800">Calendar</span> 
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}