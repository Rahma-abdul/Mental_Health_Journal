import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Calendar.css' ;
import { Expand } from 'lucide-react';

function Calendar() {
    
    const rows = 12;
    const cols  = 31;
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]


    const example = [
        { date: '2025-01-05', color: 'green' },
        { date: '2025-02-14', color: 'blue' },
        { date: '2025-03-22', color: 'red' },
        { date: '2025-03-05', color: 'black' },
    ]

    const colorMap = {}
    example.forEach(
        entry => {
            const date = new Date(entry.date);
            const month = date.getMonth();
            const day = date.getDate();
            colorMap[`${month}-${day}`] = entry.color;
        }
    );

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
                        {days.map((day2,colIndex) => (
                                // const color = colorMap[`${rowIndex}-${day2}`];
                                <div className='cell' key={colIndex} style={{backgroundColor:  colorMap[`${rowIndex}-${day2}`]}}></div>
                        )
                        )}
                    </div>
                ))}
            </div>
       </Sidebar>
      );
}

export default Calendar;
