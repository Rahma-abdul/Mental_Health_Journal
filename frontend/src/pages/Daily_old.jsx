import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function Daily() {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  //const [mood, setMood] = useState("");


  return <>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Daily Journal
        </h2>

        {/* Title Input */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Entry title"
          />
        </div>

        {/* Daily Entry Textarea */}
        <div className="mb-4">
          <label
            htmlFor="entry"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Daily Entry
          </label>
          <textarea
            id="entry"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows="6"
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>

      <Sidebar />
    </>
}


// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import '../styles/Daily.css';
// import happy from '../assets/happy.png'
// import sad from '../assets/sad.png'
// import neutral from '../assets/neutral.png'
// import angry from '../assets/angry.png'
// import emotional from '../assets/emotional.png'
// import playlist from '../assets/music.png'

// function Daily() {
//     const [mood , setMood] = useState(null);

//     const [date, setDate] = useState(() => {
//         const today = new Date();
//          // "YYYY-MM-DD"
//         return today.toISOString().split('T')[0];
//     });

//     const handleEntry = () =>{
//         // Backend
//     };

//     return (
//             <Sidebar>
//                 <h1>Daily Entry</h1>
//                 <div className="daily-container">
//                     <div className="daily-entry">
//                         <div className="daily-header">
//                             <input type='text' className= 'daily-title' placeholder="Today's Title" ></input>
//                             <input type='date' className='daily-date' value={date} onChange={(e) => setDate(e.target.value)} ></input>
//                         </div>

//                             <textarea className="daily-body" placeholder="How is your day going?" rows={15}></textarea>
                        
//                             {/* <h3>Things to be Grateful for:</h3>
//                             <textarea className="body2" placeholder="What are you grateful for today?" rows ={5}></textarea> */}
                       
//                     </div>

//                     <div className="side">
//                         <div className="daily-selectmood">
//                             <h3>What's your mood today?</h3>
//                             <div className="daily-moods">
//                                  {[happy, sad, neutral, angry, emotional].map((icon, index) => (
//                                 <img
//                                     key={index}
//                                     src={icon}
//                                     alt="mood"
//                                     className={`daily-icon ${mood === index ? 'selected' : ''}`}
//                                     onClick={() => setMood(index)}
//                                 />
//                                  ))}
//                             </div>
//                         </div>


//                         <div className="daily-music">
//                             <h3>Suggested Song</h3>
//                             <img src={playlist} alt="music" className="daily-playlist"></img>
//                             <div className="daily-details">
//                                 {/* Placholder lel backend */}
//                                 <p><strong>Title:</strong> Song Name</p>
//                                 <p><strong>Artisit:</strong> Artist Name</p>
//                             </div>
//                         </div>
//                         <button className="save-entry" onClick={handleEntry}>Save Entry</button> 
//                     </div>

//                 </div>


//             </Sidebar>
//         );
// }

// export default Daily;