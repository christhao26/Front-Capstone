import React, { Component } from 'react';
import './Board.css';
import List from './List';
import axios from 'axios';

export default class Board extends Component {
  constructor(props) {
    super(props);
    //if there's a localStorage to be had grab it otherwise set state
    // if(localStorage.getItem('lists')) {
      // const rawLS = localStorage.getItem('lists');
      // const parsedLS = JSON.parse(rawLS);
      this.state = { lists: [] }
      this.state.draggedInfo= {}
    // } else {
      // this.state = {
        // lists: [
        //   {
        //     title: 'Back-log1122!',
        //     id: 0,
        //     cards: [{
        //       taskText: 'Tasks',
        //       listNumber: 0,
        //       timeId: 0
        //     }, 
        //     {
        //       taskText: 'Task 2',
        //       listNumber: 0,
        //       timeId: 1
        //     }]
        //   },
        //   {
        //     title: 'ToDo',
        //     id: 1,
        //     cards: [{
        //       taskText: 'Task 1',
        //       listNumber: 1,
        //       timeId: 2
        //     }, 
        //     {
        //       taskText: 'Task 2',
        //       listNumber: 1,
        //       timeId: 3
        //     }]
        //   },
        //   {
        //     title: 'In Progress',
        //     id: 2,
        //     cards: [{
        //       taskText: 'Task 1',
        //       listNumber: 2,
        //       timeId: 4
        //     }, 
        //     {
        //       taskText: 'Task 2',
        //       listNumber: 2,
        //       timeId: 5
        //     }]
        //   },
        //   {
        //     title: 'Done!',
        //     id: 3,
        //     cards: [{
        //       taskText: 'Task 1',
        //       listNumber: 3,
        //       timeId: 6
        //     }, 
        //     {
        //       taskText: 'Task 2',
        //       listNumber: 3,
        //       timeId: 7
        //     }]
        //   }
        // ]
      // }

      localStorage.setItem('lists', JSON.stringify(this.state.lists))
      console.log(localStorage.getItem("lists"))
    // }
  }
componentDidMount = () => {
 axios({
    method: 'get',
    url: "http://localhost:8080/api/lists",
    headers: {
     credentials: 'include',
    }
  })
  .then(data => {
    console.log(data.data, "data from board")
    this.setState({lists: data.data})
localStorage.setItem("lists",JSON.stringify(this.state.lists))
  })
}

  //get id of item being dragged and list where it's coming from
  onDragStart = (e, fromList) => {
    console.log(`what a drag!`)
    console.log(fromList)
    const dragInfo = {
      taskId: e.currentTarget.id,
      taskText: e.currentTarget.innerHTML,
      fromList: fromList
    }
  
    localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
    this.setState({draggedInfo: dragInfo})
    console.log(this.state)
  }
// componentDidUpdate(){
//   console.log(this.state.lists)
//   axios({
//     method: "post",
//     url:"http://localhost:8080/api/lists/post/all",
//     headers: {
//       credentials: 'include',
//     },
//     data:this.state.lists
//   })
//   }

handleDelete=(itemId, columnId)=> {
  console.log("state", columnId)
  const updatedTodoItems =this.state.lists[columnId].cards.filter(card => card.timeId != itemId)
  const updatedLists = this.state.lists;
  updatedLists[columnId].cards = updatedTodoItems;
  this.setState({lists: updatedLists})
  
}
handleEdit=(itemId, columnId, newText)=> {
  console.log("state", columnId)
  const editTodoCard =this.state.lists[columnId].cards.filter(card => card.timeId == itemId)[0]
  const cardIndex = this.state.lists[columnId].cards.indexOf(editTodoCard)
  const editedLists = this.state.lists;
  editedLists[columnId].cards[cardIndex].taskText= newText;
  this.setState({lists: editedLists})
  
}

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, listNum) => {
    //get the dropped task card, the localStorage, 
    const droppedTask = localStorage.getItem('dragInfo');
    const rawLS = localStorage.getItem('lists');
    const parsedLS = JSON.parse(rawLS);
    console.log(rawLS)
    const parsedDragInfo = JSON.parse(droppedTask)

    //get task cards array, get rid of moved card, and put a new card
    // in the list where it was dropped
    console.log(parsedDragInfo)
    console.log(rawLS[parsedDragInfo.fromList ])
    const fromLists = parsedDragInfo.fromList
    console.log(Object.values(rawLS))
    const cardsArray = parsedLS[parsedDragInfo.fromList].cards
    console.log(cardsArray)
    const taskCard = cardsArray.find(card => card.timeId == parsedDragInfo.taskId)
    console.log(taskCard)
    const indexOfCard = cardsArray.findIndex(card => card.timeId == parsedDragInfo.taskId)
    parsedLS[parsedDragInfo.fromList].cards.splice(indexOfCard, 1)
    parsedLS[listNum].cards.push({...taskCard, listNumber: parseInt(listNum)})
   
    //sync the state and localStorage
    this.setState({
      lists: parsedLS
    });
    localStorage.setItem('lists', JSON.stringify(parsedLS));
    
  }

  //add some new task cards
  addTaskCard(taskText, listNumber) {
    const rawLS = localStorage.getItem('lists');
    const parsedLS = JSON.parse(rawLS);

    const newTask = {
      taskText,
      listNumber,
      timeId: new Date().valueOf()
    }

    console.log("this is new task", newTask)

    parsedLS[listNumber].cards.push(newTask)

    //sync state and localStorage
    this.setState({
      lists: parsedLS
    })
    localStorage.setItem('lists', JSON.stringify(parsedLS))
  
  }


render() {
  console.log(this.state)
  const lists = this.state.lists.map((list, index) => (
    <li className="list-wrapper" key={index}>
      <List {...list} 
        onAdd={(taskText, listNumber) => this.addTaskCard(taskText, listNumber)} 
        handleDelete={this.handleDelete}
        handleEdit={this.handleEdit}
        // onDelete= {(e)=> this.handleDelete(e.target.listNumber)}
        onDragStart={(e, fromList) => this.onDragStart(e, `${list.id}`)}
        onDragOver={(e) => this.onDragOver(e)} 
        onDrop={(e, listNum) => {this.onDrop(e, `${list.id}`)}}
      />
    </li>
  ));
   
  return (
    <div className="board">
      <h1>hiiiii</h1>
      <ul className="lists">
        {lists}
      </ul>
    </div>
  );
  }
}