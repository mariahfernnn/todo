// TEST CODE

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './Application.css';

// Add a new item 
function addItem() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')

  return (
    <form>
      <div>
      <TextField
          required
          id="title"
          label="Title"
          className={classes.textField}
          margin="normal"
          onChange={handleTitleChange}
          value={title}
        />
      </div>
    </form>
  )
}

// function Task({ task }) {
//     return (
//         <div
//             className="task"
//             style={{ textDecoration: task.completed ? "line-through" : "" }}
//         >
//             {task.title}
//         </div>
//     );
// }
export default function Todo() {
    const [tasks, setTasks] = useState([
        {
            title: "Grab some Pizza",
            completed: true
        },
        {
            title: "Do your workout",
            completed: true
        },
        {
            title: "Hangout with friends",
            completed: false
        }
    ]);
    return (
        <div className="todo-container">
            <div className="header">THINGS TO DO</div>
            <div className="tasks">
                {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}