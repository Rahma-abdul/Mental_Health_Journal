import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Calendar.css' ;

function Calendar() {
    
    const rows = 12;
    const cols  = 31;
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
       <Sidebar>
            <h1>Yearly Mood Tracker</h1>

            <div className='table'>
                <div className='header'>
                    <div className="space"></div>  
                    {  
                        days.map(day => (
                            <div key={day} className='days'>{day}</div>
                        ))
                    }
                </div>
    
                {months.map((month,rowIndex) => (
                    <div className='grid' key={rowIndex}>
                        <div className='label'>{month}</div>
                        {days.map((_,colIndex) => (
                                <div className='cell' key={colIndex}></div>
                             ))}
                    </div>
                ))}
            </div>
       </Sidebar>
      );
}

export default Calendar;
