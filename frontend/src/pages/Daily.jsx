import React, { useState } from "react";
import Sidebar from "./Sidebar";
import '../styles/Daily.css';
import happy from '../assets/happy.png';
import sad from '../assets/sad.png';
import neutral from '../assets/neutral.png';
import angry from '../assets/angry.png';
import emotional from '../assets/emotional.png';
import playlist from '../assets/music.png';

function Daily() {
    const [mood, setMood] = useState(null);
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    });
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');

    const handleEntry = async () => {
        const userId = localStorage.getItem('user_id');

        if (!userId) {
            console.error("User ID not found in localStorage.");
            return;
        }

        try {
            // 1. Create Entry
            const entryResponse = await fetch(`http://localhost:8000/users/${userId}/entries/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    entry_date: date,
                    title: title,
                    notes: notes,
                    mood_id: mood + 1 // Assuming mood images are 0-indexed and backend expects 1-indexed
                })
            });

            if (!entryResponse.ok) {
                const error = await entryResponse.json();
                console.error("Error creating entry:", error);
                return;
            }

            const entry = await entryResponse.json();
            const entryId = entry.id;

            // Store entry_id in localStorage for later use if needed
            localStorage.setItem('entry_id', entryId);

            // 2. Get Song Recommendation
            const songResponse = await fetch(`http://localhost:8000/users/${userId}/entries/${entryId}/song-recommendation`);

            if (songResponse.ok) {
                const songData = await songResponse.json();
                const recommendation = songData.song_recommendation;

                if (recommendation && recommendation.includes('-')) {
                    const [titlePart, artistPart] = recommendation.split('-').map(str => str.trim());
                    setSongTitle(titlePart);
                    setArtistName(artistPart);
                } else {
                    setSongTitle(recommendation || '');
                    setArtistName('Unknown');
                }
            } else {
                console.warn("Could not get song recommendation.");
            }

            console.log("Entry saved and song recommendation retrieved.");
        } catch (error) {
            console.error("Failed to save entry or get song recommendation:", error);
        }
    };

    return (
        <Sidebar>
            <h1>Daily Entry</h1>
            <div className="daily-container">
                <div className="daily-entry">
                    <div className="daily-header">
                        <input
                            type='text'
                            className='daily-title'
                            placeholder="Today's Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type='date'
                            className='daily-date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <textarea
                        className="daily-body"
                        placeholder="How is your day going?"
                        rows={15}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>

                <div className="side">
                    <div className="daily-selectmood">
                        <h3>What's your mood today?</h3>
                        <div className="daily-moods">
                            {[happy, sad, neutral, angry, emotional].map((icon, index) => (
                                <img
                                    key={index}
                                    src={icon}
                                    alt="mood"
                                    className={`daily-icon ${mood === index ? 'selected' : ''}`}
                                    onClick={() => setMood(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="daily-music">
                        <h3>Suggested Song</h3>
                        <img src={playlist} alt="music" className="daily-playlist" />
                        <div className="daily-details">
                            <p><strong>Title:</strong> {songTitle || 'No recommendation yet'}</p>
                            <p><strong>Artist:</strong> {artistName || '-'}</p>
                        </div>
                    </div>

                    <button className="save-entry" onClick={handleEntry}>Save Entry</button>
                </div>
            </div>
        </Sidebar>
    );
}

export default Daily;

