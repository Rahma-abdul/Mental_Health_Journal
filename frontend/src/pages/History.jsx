import { useState } from "react";  
import '../styles/History.css'; 
import { useNavigate } from "react-router-dom";


function History() {
   const example = [
    {
        mood: ':)',
        date: '2023-10-01',
        entry: 'I had a great day today! I went for a walk and enjoyed the sunshine.',
        playlist: "happy"
    }, 
    {
        mood: ':(',
        date: '2023-10-02',
        entry: 'I had a bad day today. I felt sad and unmotivated.',
        playlist: "sad"
    }, 
    {
        mood: ':|',
        date: '2023-10-03',
        entry: 'I had a neutral day today. Nothing special happened.',
        playlist: "neutral"
    }
   ]

    return (
        <div className="title">
            <h1>BLAH BLAH BLAH</h1>
        </div>
    );
}


export default History;
