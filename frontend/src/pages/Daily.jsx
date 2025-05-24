import React, { useState } from "react";
import Sidebar from "./Sidebar";
import '../styles/Daily.css';
import happy from '../assets/happy.png'
import sad from '../assets/sad.png'
import neutral from '../assets/neutral.png'
import angry from '../assets/angry.png'
import emotional from '../assets/emotional.png'
import playlist from '../assets/music.png'

function Daily() {
    const [mood , setMood] = useState(null);

    const [date, setDate] = useState(() => {
        const today = new Date();
         // "YYYY-MM-DD"
        return today.toISOString().split('T')[0];
    });

    return (
            <Sidebar>
                <h1>Daily Entry</h1>
                <div className="daily-container">
                    <div className="daily-entry">
                        <div className="daily-header">
                            <input type='text' className= 'daily-title' placeholder="Today's Title" ></input>
                            <input type='date' className='daily-date' value={date} onChange={(e) => setDate(e.target.value)} ></input>
                        </div>

                            <textarea className="daily-body" placeholder="How is your day going?" rows={15}></textarea>
                        
                            {/* <h3>Things to be Grateful for:</h3>
                            <textarea className="body2" placeholder="What are you grateful for today?" rows ={5}></textarea> */}
                       
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
                            <img src={playlist} alt="music" className="daily-playlist"></img>
                            <div className="daily-details">
                                {/* Placholder lel backend */}
                                <p><strong>Title:</strong> Song Name</p>
                                <p><strong>Artisit:</strong> Artist Name</p>
                            </div>
                        </div>
                    </div>

                </div>


            </Sidebar>
        );
}

export default Daily;

