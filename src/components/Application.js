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

// Create new task component
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

// Existing task component
function Task({ task, index, completeTask, deleteTask }) {
  const classes = useStyles()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div
      className="task"
      onClick={() => setShowDetails(true)}
    >
      <div style={{ textDecoration: task.status === "DONE" ? "line-through" : "" }}>
        {task.title}
      </div>

      {showDetails ? 
        <div className="task">
          <Button 
            id="delete" 
            variant="contained" 
            onClick={() => {deleteTask(index)}}
          >
            DELETE
          </Button>
          <Button 
            id="complete" 
            variant="contained" 
            style={{ visibility: task.status === "DONE" ? "hidden" : "" }}
            onClick={() => {completeTask(index)}}
          >
            COMPLETE
          </Button>
          <h4>Description:</h4>
            {task.description}
          <h4>Status:</h4>
            {task.status}
          <h4>Due Date:</h4>
            {moment(task.due_date).format('MMM Do YYYY') === moment().format('MMM Do YYYY') && task.status === "PENDING" ?
            <div className={classes.root}>
              <Alert severity="error">THIS IS DUE!</Alert>
            </div> 
            : moment(task.due_date).format('MMM Do YYYY')}
        </div> 
        : ""
      }
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
