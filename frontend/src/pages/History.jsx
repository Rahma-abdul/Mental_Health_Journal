import { useState } from "react";  
import '../styles/History.css'; 
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import happy from '../assets/happy.png'
import sad from '../assets/sad.png'
import neutral from '../assets/neutral.png'
import angry from '../assets/angry.png'
import emotional from '../assets/emotional.png'
import playlist from '../assets/music.png'


function History() {
   const example = [
    {
        mood: 'happy',
        date: '2023-10-02',
        title: 'Park Day' , 
        playlist: "happy" ,
        details: "Hi so i went to the park today and i was a cute little puppy and i played with it all day"
    }, 
    {
        mood: 'sad',
        date: '2023-10-01',
        title: 'Results Day' ,
        playlist: "sad",
        details: "Hello :( My results came today , i didn't do well , i'm so upset"
    }, 
    {
        mood: 'neutral',
        date: '2023-10-03',
        title: 'Regular Day',
        playlist: "neutral",
        details: "Such a mehhh dayyy nothing much happened same boring day again i guess"
    }
   ];

   const formatDate = (dataStr) => {
    const date = new Date(dataStr);
    return `${date.toDateString()}` ;
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

    const [expandedCard, setExpandedCard] = useState(null);

    const toggleCard = (date) => {
        setExpandedCard(prev => (prev === date ? null : date));
    };


    const sortedEntries = [...example].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
    <Sidebar>
        <h1>Previous Entries</h1>
        <div className="content">
            
            {/* Placeholder lel backend */}
            {sortedEntries.map((entry) => (
                <div key={entry.date} className= 'card'  onClick={() => toggleCard(entry.date)}>
                    <div className="header"  >
                        <span className= 'date'>{formatDate(entry.date)}</span>
                        <span className= 'title'>{entry.title}</span>
                        <img
                        src = {getEmojiIcon(entry.mood)}
                        alt = {entry.mood}
                        className = "mood"
                        />
                        <div className='playlist'>
                            <div className="playlist-name">{entry.playlist}</div>
                            <img
                            src = {playlist}
                            alt = {"music"}
                            className = "music-player"
                        />
                        </div>
                    </div>
                    {expandedCard === entry.date && (
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
