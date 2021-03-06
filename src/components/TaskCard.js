import React, { useState } from 'react';
import './TaskCard.css';
import EditTaskForm from './EditTaskForm';
import Trashcan from '../images/tashcan2.png';

export default function TaskCard(props) {

const [editOn, setEditOn]= useState(false);

const onEdit = (itemId, columnId, newText) => {
  props.handleEdit(itemId, columnId, newText)
  setEditOn(false);
}

 const handleCancel = () => {
   setEditOn(false);
 }  


  return (
    <div className="task-card" draggable="true" id={[props.timeId]} onDragStart={props.onDragStart}>
      {editOn ? <EditTaskForm 
       columnId= {props.columnId}
       itemId= {props.timeId} 
       onEdit= {onEdit} 
       taskText= {props.taskText}
       handleCancel= {handleCancel}/> 
      :<div className="trash-content">
      <div onClick={()=>setEditOn(true)}>{props.taskText}</div>
      <img id="just-for-trashcan" alt="Trashcan" src={Trashcan}
       onClick={()=>props.handleDelete(props.timeId, props.columnId)}/>
      </div> } 
      
    </div>

  ) 
};