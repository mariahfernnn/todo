import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Application.css';

// Add a new item 
function Item ({ addItem }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('')
  // const [showForm, setShowForm] = useState(false)

  const handleSubmit = function(evt) {
    evt.preventDefault()
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  const handleStatusChange = e => {
    setStatus(e.target.value)
  }

  const handleDueDateChange = e => {
    setDueDate(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          required
          id="title"
          label="Title"
          margin="normal"
          onChange={handleTitleChange}
          value={title}
        />
        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          onChange={handleDescriptionChange}
          value={description}
        />
        <TextField
          required
          id="status"
          label="Status"
          margin="normal"
          onChange={handleStatusChange}
          value={status}
        />
        <TextField
          required
          id="dueDate"
          label="Due Date"
          margin="normal"
          onChange={handleDueDateChange}
          value={dueDate}
        />
      </div>
      <div>
        {/* <Button variant="contained" onClick={() => setShowForm(false)}>
          Cancel
        </Button> */}
        <Button variant="contained" type="submit">
          Submit
        </Button> 
      </div>
    </form>
  )
}

// TEST CODE
function Task({ task }) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}
        </div>
    );
}

export default function Todo() {
  const [showForm, setShowForm] = useState(false)
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
          <div>
            <Button variant="contained" onClick={()=> setShowForm(true)}>
              Create
            </Button>
          </div>
            {showForm ? <Item setShowForm={setShowForm} /> : ""}
      </div>
  );
}
