import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import DatePicker from "react-datepicker";
import './Application.css';
// import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles(theme => ({
  input: {
    color: "white"
  }
}));

// Create a create new task component
function CreateTask ({ addTask, editTask }) {
  const classes = useStyles()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('PENDING')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = function(evt) {
    evt.preventDefault()
    addTask(title, description, status, dueDate)
  }

  // Modify - not working
  const handleUpdate = function(evt) {
    evt.preventDefault()
    editTask(title, description, status, dueDate)
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
    <form onSubmit={handleSubmit} onUpdate={handleUpdate} noValidate autoComplete="off">
      <div className="create-task">
        <TextField
          required
          id="title"
          label="TITLE"
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
          label="DESCRIPTION"
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
          label="STATUS"
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
          label="DUE DATE (YY/MM/DD)"
          margin="normal"
          fullWidth
          InputProps={{
            className: classes.input,
          }}
          onChange={handleDueDateChange}
          value={dueDate}
        />
        {/* <DatePicker
          placeholderText="Click to select a date"
          selected={dueDate}
          onChange={handleDueDateChange}
        /> */}
      </div>
        <div>
          <Button id="submit" variant="contained" type="submit">
            SUBMIT
          </Button> 
        </div>
    </form>
  )
}

// Remove line-through style in Details
// Another way to show STATUS?
// How to manage due dates?
// Existing task component
function Task({ task, index, description, status, due_date, addTask, completeTask, deleteTask, editTask }) {
  const [showDetails, setShowDetails] = useState(false)
  // const [showForm, setShowForm] = useState(false)

    return (
        <div
          className="task"
          style={{ textDecoration: task.status === "DONE" ? "line-through" : "" }}
          onClick={()=> setShowDetails(true)}
        >
          {task.title}
          
          {showDetails ? 
            <div className="task">
              <Button id="delete" variant="contained" onClick={() => editTask(index)}>
                EDIT
              </Button>
              <Button id="delete" variant="contained" onClick={() => deleteTask(index)}>
                DELETE
              </Button>
              <Button 
                id="complete" 
                variant="contained" 
                style={{ visibility: task.status === "DONE" ? "hidden" : "" }}
                onClick={() => completeTask(index)}
              >
                COMPLETE
              </Button>
              <h4>Description:</h4>
              {task.description}
              <h4>Status:</h4>
              {task.status}
              <h4>Due Date:</h4>
              {task.due_date}
            </div> 

          : ""}
        </div>
    );
}

export default function Todo() {
  const [showForm, setShowForm] = useState(false)
  const [tasks, setTasks] = useState([]);

  const addTask = function(title, description, status, due_date) {
    const newTask = [...tasks, {title, description, status, due_date}]
    setTasks(newTask)
    setShowForm(false)
  }

  // Modify - not working
  const editTask = function(title, description, status, due_date, index) {
    const newTask = [...tasks, {title, description, status, due_date}]
    setTasks(newTask[index])
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
          {showForm ? 
          <CreateTask setShowForm={setShowForm} addTask={addTask} editTask={editTask}/> : 
          <div className="tasks">
            {tasks.map((task, index) => (
              <Task
              task={task}
              index={index}
              key={index}
              editTask={editTask}
              deleteTask={deleteTask}
              completeTask={completeTask}
              />
            ))}
          </div>}
      </div>
  );
}
