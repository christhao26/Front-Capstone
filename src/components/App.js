import React from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Board from './Board';

function App() {
    return (
        <div>
             <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Board} />
          <Route path='/Home' component={Board} />
          {/* <Route path='/products' component={Products} /> */}
        </Switch>
      </Router>
        </div>
    )
}

export default App
