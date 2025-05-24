import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/Calendar.css';
import { useNavigate } from "react-router-dom";

function Calendar() {
    const [moodHistory, setMoodHistory] = useState({});
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    useEffect(() => {
        const fetchMoodHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/history/${userId}/${selectedYear}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await response.json();
                const newColorMap = {};

                for (const monthKey in data) {
                    data[monthKey].forEach(entry => {
                        const date = new Date(entry.date);
                        const month = date.getMonth();
                        const day = date.getDate();
                        const rawColor = entry.color?.trim().toLowerCase();
                        const isValidColor = /^#[0-9a-f]{6}$/.test(rawColor) && rawColor !== '#ffffff';
                        const key = `${month}-${day}`;
                        newColorMap[key] = isValidColor ? rawColor : 'transparent';
                    });
                }

                setMoodHistory(newColorMap);
                setError(null);
            } catch (error) {
                if (!error.message.includes("Unauthorized")) {
                    setError("Could not fetch mood history. Please try again later.");
                }
            }
        };

        fetchMoodHistory();
    }, [userId, selectedYear, token, navigate]);

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <Sidebar>
            <h1>Yearly Mood Tracker</h1>

            <div className="year-selector">
                <label htmlFor="year">Select Year: </label>
                <select id="year" value={selectedYear} onChange={handleYearChange} className='year-dropdown'>
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            {error && <p className="error-message">{error}</p>}

            {!error && (
                <div className="table">
                    <div className="header">
                        <div className="space"></div>
                        {Array.from({ length: 31 }, (_, i) => (
                            <div key={i + 1} className="days">{i + 1}</div>
                        ))}
                    </div>

                    {months.map((month, rowIndex) => (
                        <div className="grid" key={rowIndex}>
                            <div className="label">{month}</div>
                            {Array.from({ length: daysInMonth(selectedYear, rowIndex) }, (_, colIndex) => {
                                const day = colIndex + 1;
                                const key = `${rowIndex}-${day}`;
                                const color = (moodHistory[key] || '').toLowerCase();
                                const bgColor = /^#[0-9a-f]{6}$/.test(color) && color !== '#ffffff' ? color : 'transparent';

                                return (
                                    <div className="cell" key={day} style={{ backgroundColor: bgColor }}></div>
                                );
                            })}
                            {Array.from({ length: 31 - daysInMonth(selectedYear, rowIndex) }, (_, i) => (
                                <div key={`empty-${rowIndex}-${i}`} className="cell empty-cell"></div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Sidebar>
    );
}

export default Calendar;
