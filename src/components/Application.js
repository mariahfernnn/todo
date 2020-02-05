import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Application.css';

// Create a create new task component
function CreateTask ({ addTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('PENDING')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = function(evt) {
    evt.preventDefault()
    addTask(title, description, status, dueDate)
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  // Status can either be PENDING or DONE
  // Changed initial state to PENDING
  // Make it a dropdown later
  const handleStatusChange = e => {
    setStatus(e.target.value)
  }

  const handleDueDateChange = e => {
    setDueDate(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="create-task">
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
            style={{ textDecoration: task.status === "DONE" ? "line-through" : "" }}
        >
            {task.title}
        </div>
    );
}

export default function Todo() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([
      {
        title: "Eat",
        description: "Order Pizza",
        status: "DONE",
        due_date: Date("2020-01-31")
      },
      {
        title: "Homework",
        description: "Read chapters 1-3",
        status: "DONE",
        due_date: Date("2020-01-31")
      },
      {
        title: "Workout",
        description: "Go to yoga",
        status: "PENDING",
        due_date: Date("2020-02-05")
      }
  ]);

  const addTask = function(title, description, status, due_date) {
    const newTask = [...tasks, {title, description, status, due_date}]
    setTasks(newTask)
    setShowForm(false)
  }

  return (
    <div className="todo-container">
          <div className="header">THINGS TO DO</div>
          {/* <div className="tasks">
              {tasks.map((task, index) => (
                <Task
                task={task}
                index={index}
                key={index}
                />
                ))}
          </div> */}
          <div>
            <Button variant="contained" onClick={()=> setShowForm(true)}>
              Create
            </Button>
            <Button variant="contained" onClick={() => setShowForm(false)}>
              Close
            </Button>
          </div>
          {showForm ? <CreateTask setShowForm={setShowForm} addTask={addTask} /> : 
          <div className="tasks">
            {tasks.map((task, index) => (
              <Task
              task={task}
              index={index}
              key={index}
              />
            ))}
          </div>}
      </div>
  );
}
