import React from 'react';
import './AddTaskForm.css';
import axios from 'axios';

export default class AddTaskForm extends React.Component {
 state = {
      editing: false,
      todoItems: null
    }

  onSubmit(event) {
    event.preventDefault();
    const taskText = this.textInput.value.trim();
    const listNumber = this.props.formNum;
    console.log(listNumber)
    if (taskText && this.props.onAdd) {
      this.props.onAdd(taskText, listNumber);
    }
    this.textInput.value = '';
  }

 setEditing(editing) {
    this.setState({
      editing
    });
  }

  deleteTodoItem = ()=> {
    axios({
   method: 'DElETE',
   url: "http://localhost:8080/api/todoItems/{id}",
   headers: {
    credentials: 'include',
   }
 })
 .then(data => {
   console.log(data.data, "data from Backend")
   this.setState({lists: data.data})
//  localStorage.setItem("lists",JSON.stringify(this.state.lists))
 })
}

  render() {
    if(!this.state.editing) {
      return (
        <div className="open-add-button" onClick={() => this.setEditing(true)}>
          <a href="#">Add a task!</a>
        </div>  
        ); 
    }
      return (
        <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
          <div onClick={(e)=>this.handleDelete(e)}>X
          <input type="text" class="task-input" ref={input => this.textInput = input} aria-label="Add a task" />
          <div>
            </div>
            <button className="button add-button">Add Task</button>
            <button className="button cancel-button" onClick={() => this.setEditing(false)}>Cancel</button>
            <button className="button add-button">Edit</button>
          </div>
        </form>
      );
  }
}