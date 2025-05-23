import { useState, useEffect } from "react";  
import '../styles/History.css'; 
import axios from "axios";
import Sidebar from "./Sidebar";

import happy from '../assets/happy.png';
import sad from '../assets/sad.png';
import neutral from '../assets/neutral.png';
import angry from '../assets/angry.png';
import emotional from '../assets/emotional.png';

function History() {
    const [entries, setEntries] = useState([]);
    const [expandedCard, setExpandedCard] = useState(null);

    const moodMap = {
        1: "happy",
        2: "sad",
        3: "neutral",
        4: "emotional",
        5: "angry"
    };

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        axios.get(`http://localhost:8000/users/${userId}/getentries`)
            .then(response => {
                const formatted = response.data.map(entry => ({
                    id: entry.id,
                    date: entry.entry_date,
                    mood: moodMap[entry.mood_id] || "neutral",
                    title: entry.title || "(No Title)",
                    details: entry.notes
                }));
                setEntries(formatted);
            })
            .catch(error => {
                console.error("Failed to fetch entries:", error);
            });
    }, []);

    const formatDate = (dataStr) => {
        const date = new Date(dataStr);
        return `${date.toDateString()}`;
    };

    const getEmojiIcon = (mood) => {
        switch (mood.toLowerCase()) {
            case 'happy':
                return happy;
            case 'sad':
                return sad;
            case 'neutral':
                return neutral;
            case 'angry':
                return angry;
            case 'emotional':
                return emotional;
            default:
                return null;
        }
    };

    const toggleCard = (id) => {
        setExpandedCard(prev => (prev === id ? null : id));
    };

    const sortedEntries = [...entries].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <Sidebar>
            <h1>Previous Entries</h1>
            <div className="content">
                {sortedEntries.map((entry) => (
                    <div key={entry.id} className='card' onClick={() => toggleCard(entry.id)}>
                        <div className="header">
                            <span className='date'>{formatDate(entry.date)}</span>
                            <span className='title'>{entry.title}</span>
                            <img
                                src={getEmojiIcon(entry.mood)}
                                alt={entry.mood}
                                className="mood"
                            />
                        </div>
                        {expandedCard === entry.id && (
                            <div className="details">
                                {entry.details}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Sidebar>
    );
}

export default History;

