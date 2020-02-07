import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { Alert } from '@material-ui/lab';
import moment from 'moment';
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
  const [dueDate, setDueDate] = useState(new Date())

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

  const handleDueDateChange = value => {
    setDueDate(value)
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
        {/* <TextField
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
        /> */}
        {/* <DatePicker
          required
          title="DUE DATE"
          placeholderText="Select due date"
          selected={dueDate}
          onChange={handleDueDateChange}
          dateFormat="MMMM d, yyyy"
        /> */}
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            required
            label="DUE DATE"
            fullWidth
            InputProps={{
              className: classes.input,
            }}
            value={dueDate}
            onChange={handleDueDateChange}
            animateYearScrolling
          />
        </MuiPickersUtilsProvider>
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
function Task({ task, index, completeTask, deleteTask }) {
  const classes = useStyles()

  const [showDetails, setShowDetails] = useState(false)
  // const [showForm, setShowForm] = useState(false)

  return (
    <div
      className="task"
      style={{ textDecoration: task.status === "DONE" ? "line-through" : "" }}
      onClick={() => setShowDetails(true)}
    >
      {task.title}
      {showDetails ? 
        <div className="task">
          {/* <Button id="delete" variant="contained" onClick={() => editTask(index)}>
            EDIT
          </Button> */}
          <Button 
            id="delete" 
            variant="contained" 
            onClick={() => {deleteTask(index); setShowDetails(false)}}
          >
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
          {/* {moment(task.due_date).format('MMM Do YYYY')} */}
            {moment(task.due_date).format('MMM Do YYYY') === moment().format('MMM Do YYYY') ?
            <div className={classes.root}>
              <Alert severity="error">This is due!</Alert>
            </div> 
            : moment(task.due_date).format('MMM Do YYYY')}
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
    console.log("What is the new task?", newTask)
    setShowForm(false)
  }

  // const editTask = function(evt, index) {
  //   const newTask = [...tasks]
  //   newTask[index].title = evt.target.value
  //   setTasks(newTask)
  // }

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
      <div className="header">TO DO OR NOT TO DO...?
        <Button id="add" variant="contained" onClick={()=> setShowForm(true)}>
          +
        </Button>
      </div>
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
