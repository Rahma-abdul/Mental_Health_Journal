// import { useState } from "react";  
// import '../styles/History.css'; 
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import happy from '../assets/happy.png'
// import sad from '../assets/sad.png'
// import neutral from '../assets/neutral.png'
// import angry from '../assets/angry.png'
// import emotional from '../assets/emotional.png'
// import playlist from '../assets/music.png'


// function History() {
//    const example = [
//     {
//         mood: 'happy',
//         date: '2023-10-02',
//         title: 'Park Day' , 
//         playlist: "happy" ,
//         details: "Hi so i went to the park today and i was a cute little puppy and i played with it all day"
//     }, 
//     {
//         mood: 'sad',
//         date: '2023-10-01',
//         title: 'Results Day' ,
//         playlist: "sad",
//         details: "Hello :( My results came today , i didn't do well , i'm so upset"
//     }, 
//     {
//         mood: 'neutral',
//         date: '2023-10-03',
//         title: 'Regular Day',
//         playlist: "neutral",
//         details: "Such a mehhh dayyy nothing much happened same boring day again i guess"
//     }
//    ];

//    const formatDate = (dataStr) => {
//     const date = new Date(dataStr);
//     return `${date.toDateString()}` ;
//    };

   
//     const getEmojiIcon = (mood) => {
//     switch (mood.toLowerCase()) {
//         case 'happy':
//         return happy;
//         case 'sad':
//         return sad;
//         case 'neutral':
//         return neutral;
//         case 'angry':
//         return angry;
//         case 'emotional':
//         return emotional;
//         default:
//         return null;
//     }
//     };

//     const [expandedCard, setExpandedCard] = useState(null);

//     const toggleCard = (date) => {
//         setExpandedCard(prev => (prev === date ? null : date));
//     };


//     const sortedEntries = [...example].sort(
//         (a, b) => new Date(b.date) - new Date(a.date)
//     );

//     return (
//     <Sidebar>
//         <h1>Previous Entries</h1>
//         <div className="content">
            
//             {/* Placeholder lel backend */}
//             {sortedEntries.map((entry) => (
//                 <div key={entry.date} className= 'card'  onClick={() => toggleCard(entry.date)}>
//                     <div className="header"  >
//                         <span className= 'date'>{formatDate(entry.date)}</span>
//                         <span className= 'title'>{entry.title}</span>
//                         <img
//                         src = {getEmojiIcon(entry.mood)}
//                         alt = {entry.mood}
//                         className = "mood"
//                         />
//                         <div className='playlist'>
//                             <div className="playlist-name">{entry.playlist}</div>
//                             <img
//                             src = {playlist}
//                             alt = {"music"}
//                             className = "music-player"
//                         />
//                         </div>
//                     </div>
//                     {expandedCard === entry.date && (
//                     <div className="details">
//                     {entry.details}
//                     </div>
//                     )}
//                 </div>

//             ))}
//         </div>
//     </Sidebar>
//    );
// }



import { useState, useEffect } from "react";
import axios from "axios";
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
  const [entries, setEntries] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");
  console.log(userId)
  const year = new Date().getFullYear(); // This will correctly get the current year

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

  const formatDate = (dataStr) => {
    const date = new Date(dataStr);
    return date.toDateString();
  };

  const toggleCard = (date) => {
    setExpandedCard(prev => (prev === date ? null : date));
  };

  useEffect(() => {
    const fetchEntries = async () => {
      // **IMPORTANT MODIFICATION START**
      // Check if userId and token are available before making the API call
      if (!userId || !token) {
        console.warn("User ID or Token not found in localStorage. Redirecting to login.");
        setError("Please log in to view your history.");
        navigate('/login'); // Redirect to your login page
        return; // Stop further execution of the effect
      }
      // **IMPORTANT MODIFICATION END**

      try {
        const res = await axios.get(`http://127.0.0.1:8000/history/${userId}/${year}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming the API returns { 1: [ { date, color }, ... ], 2: [ ... ], ... }
        const allEntries = Object.values(res.data).flat().map(entry => ({
          mood: entry.color, // assuming color maps to mood
          date: entry.date,
          title: 'Journal Entry', // You might want to get the actual title from the backend if available
          playlist: entry.color, // Assuming playlist name is same as mood, or adjust if backend provides
          details: 'No additional details available.', // Update when backend supports details
        }));

        // Sort entries by date (newest first)
        allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(allEntries);
        setError(null); // Clear any previous errors if fetch is successful
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response && err.response.status === 422) {
          setError("Invalid request. Please ensure your user ID is correct.");
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in again.");
          navigate('/login');
        } else {
          setError("Could not fetch mood history. Please try again later.");
        }
      }
    };

    fetchEntries();
  }, [userId, token, year, navigate]); // Added navigate to the dependency array

  return (
    <Sidebar>
      <h1>Previous Entries</h1>
      <div className="content">
        {error && <p className="error-message">{error}</p>} {/* Added a class for styling error messages */}
        {entries.length === 0 && !error && (
            <p>No entries found for this year. Start journaling to see your history!</p>
        )}
        {entries.map((entry) => (
          <div key={entry.date} className='card' onClick={() => toggleCard(entry.date)}>
            <div className="header">
              <span className='date'>{formatDate(entry.date)}</span>
              <span className='title'>{entry.title}</span>
              <img
                src={getEmojiIcon(entry.mood)}
                alt={entry.mood}
                className="mood"
              />
              <div className='playlist'>
                <div className="playlist-name">{entry.playlist}</div>
                <img
                  src={playlist}
                  alt="music"
                  className="music-player"
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