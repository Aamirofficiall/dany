import './App.css';
import Axios from 'axios'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Iteration from './components/Iteration'
import IterationDetail from './components/IterationDetail'
import CreateIteration from './components/CreateIteration'
import Nav from './components/Nav'
import Question from './components/Question';

export class App extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <React.Fragment>

            <Nav />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Iteration} />
                <Route exact path='/create' component={CreateIteration} />
                <Route exact path='/iter/:id/question' component={Question} />
                <Route path='/:id' component={IterationDetail} />
              </Switch>
            </div>
          </React.Fragment>

        </div>
      </BrowserRouter>

    )
  }
}



export default App;
