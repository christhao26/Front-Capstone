import React from 'react';
import axios from 'axios';

export default class EditTaskForm extends React.Component {
  state = {
       input: this.props.taskText,
     }

   onSubmit(event) {
     event.preventDefault();
     const newText = this.state.input.trim();
     const columnId = this.props.columnId;
     const itemId = this.props.itemId;
     if (newText && this.props.onEdit) {
       this.props.onEdit(itemId, columnId, newText);
     }
   }

   handleInputChange(event) {
       this.setState({input:event.target.value});
       console.log("input:", this.state.input)
   }
 


 
 
   render() {
  
       return (
         <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
           <input type="text" class="task-input" value= {this.state.input} onChange= {(e) => this.handleInputChange(e)} aria-label="Add a task" />
             <div>
             <button className="button add-button">Add Edit</button>
             <button className="button cancel-button" onClick={this.props.handleCancel}>Cancel</button>
           </div>
            </form>
       );
   }
 }