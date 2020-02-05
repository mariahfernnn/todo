import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './Application.css';

const useStyles = makeStyles(theme => ({
  input: {
    color: "white"
  }
}));

// Create a create new task component
function CreateTask ({ addTask }) {
  const classes = useStyles()
  
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

  // Make date functional later
  const handleDueDateChange = e => {
    setDueDate(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className="create-task">
        <TextField
          required
          id="title"
          label="Title"
          margin="normal"
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          onChange={handleTitleChange}
          value={title}
        />
        <TextField
          required
          id="description"
          label="Description"
          margin="normal"
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          onChange={handleDescriptionChange}
          value={description}
        />
        <TextField
          required
          id="status"
          label="Status"
          margin="normal"
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          onChange={handleStatusChange}
          value={status}
        />
        <TextField
          required
          id="dueDate"
          label="Due Date"
          margin="normal"
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          onChange={handleDueDateChange}
          value={dueDate}
        />
      </div>
        <div>
          <Button id="submit" variant="contained" type="submit">
            SUBMIT
          </Button> 
        </div>
    </form>
  )
}

// Remove line-through style once completeTask is functional
function Task({ task, index, description, status, due_date, completeTask, deleteTask }) {
  const [showDetails, setShowDetails] = useState(false)
    return (
        <div
          className="task"
          style={{ textDecoration: task.status === "DONE" ? "line-through" : "" }}
          onClick={()=> setShowDetails(true)}
        >
          {task.title}
          
          {showDetails ? 
            <div className="task">
              <Button id="delete" variant="contained" onClick={() => deleteTask(index)}>
                DELETE
              </Button>
              <Button id="complete" variant="contained" onClick={() => completeTask(index)}>
                COMPLETE
              </Button>
              <h4>Description: {task.description}</h4>
              <h4>Status: {task.status}</h4>
              <h4>Due Date: {task.due_date}</h4>
            </div> 
          : ""}
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
        due_date: "2020-01-31"
      },
      {
        title: "Homework",
        description: "Read chapters 1-3",
        status: "DONE",
        due_date: "2020-01-31"
      },
      {
        title: "Workout",
        description: "Go to yoga",
        status: "PENDING",
        due_date: "2020-02-05"
      }
  ]);

  const addTask = function(title, description, status, due_date) {
    const newTask = [...tasks, {title, description, status, due_date}]
    setTasks(newTask)
    setShowForm(false)
  }

  const completeTask = function(index) {
    const newTask = [...tasks]
    newTask[index].status = "DONE"
    setTasks(newTask)
  }

  const deleteTask = function(index) {
    const newTask = [...tasks]
    newTask.splice(index, 1)
    setTasks(newTask)
  }

  return (
    <div className="todo-container">
          <div className="header">TO DO OR NOT TO DO...
    
          <Button id="add" variant="contained" onClick={()=> setShowForm(true)}>
            +
          </Button>

          </div>
          {/* <div className="tasks">
              {tasks.map((task, index) => (
                <Task
                task={task}
                index={index}
                key={index}
                />
                ))}
          </div> */}
          {/* <div>
            <Button variant="contained" onClick={()=> setShowForm(true)}>
              Create
            </Button>
            <Button variant="contained" onClick={() => setShowForm(false)}>
              Back
            </Button>
          </div> */}
          {showForm ? 
          <CreateTask setShowForm={setShowForm} addTask={addTask}/> : 
          <div className="tasks">
            {tasks.map((task, index) => (
              <Task
              task={task}
              index={index}
              key={index}
              deleteTask={deleteTask}
              completeTask={completeTask}
              />
            ))}
          </div>}
      </div>
  );
}
