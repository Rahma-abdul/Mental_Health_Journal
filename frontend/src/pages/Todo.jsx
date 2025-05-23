import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../styles/Todo.css' ;
// import { Expand } from 'lucide-react';

function Todo() {

    const [tasks , setTasks] = useState([
        {
            completed: false ,
            text: '',
            priority: '' ,
            duration: '',
            id: Date.now()
        }
    ]);

    const handleNewTasks = () =>{
        setTasks([...tasks , {
            completed: false ,
            text: '',
            priority: '' ,
            duration: '',
            id: Date.now()
        }]);
    };

    const handleInput = (id, field , value) => {
        setTasks(tasks.map(task =>
            task.id === id ? {...task , [field]: value} :task
        ));
    };

    
    return (
       <Sidebar>
            <h1>Today's To-Do List</h1>
            <div className='container'>
               {
                tasks.map((task) => (
                    <div key= {task.id} className='task'>

                        <input type= 'checkbox' checked={task.completed} onChange={(e) => handleInput(task.id , 'completed', e.target.checked)}  className='checkbox-style'></input>
                      
                        <input type= 'text' value= {task.text} onChange={(e) => handleInput(task.id , 'text', e.target.value)} className='input' style= {task.completed ? { textDecoration: 'line-through'}:{}}></input>

                        <select value={task.priority} onChange={(e) => handleInput(task.id , 'priority', e.target.value)} className='dropdown'>
                            <option value= 'High' className='high'>High</option>
                            <option value= 'Medium' className='medium'>Medium</option>
                            <option value= 'Low' className='low'>Low</option>
                        </select>

                        <input type= 'text' value= {task.duration} onChange={(e) => handleInput(task.id , 'duration', e.target.value)} className='time' placeholder="Time required for task"></input>

                    </div>
                )
                )
               }

            <button className="add-task" onClick={handleNewTasks}>+ New Task</button>
            </div>
       </Sidebar>
      );
}

export default Todo;




