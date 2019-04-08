import React, { Component } from 'react'
import './static/css/App.css'
import Cats from './components/cats/Cats'

class App extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.connectToServer = this.connectToServer.bind(this)
  }

  connectToServer(){
    fetch('/')
  }
  
  render() {
    return (
      <div className="App">
        <Cats />
      </div>
    )
  }
}

export default App
