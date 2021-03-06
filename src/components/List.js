import React from 'react';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import './List.css';


export default class List extends React.Component {
  // constructor(props) {
  //   super(props);
  //   }
   
  render() {
    const cards = this.props.cards.map((card, index) => {
      return ( 
        <li key={index}>
          <TaskCard {...card} onDragStart={this.props.onDragStart}
           handleDelete={this.props.handleDelete} columnId= {this.props.id}
           handleEdit={this.props.handleEdit}/>
        </li>
      );
    })
      
    return (
      <div>
        <h2 className={`name-header name-${this.props.id}`}>{this.props.title}</h2>
        <ul className="list" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          {cards}
          <li className="add-list-wrapper">
            <AddTaskForm formNum={this.props.id} onAdd={this.props.onAdd}
            onDelete= {this.props.handleDelete} />
          </li>
        </ul>
      </div>
    );
  }
  
}