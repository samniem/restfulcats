import React, { Component } from 'react'
import './App.css'
import Cats from './components/cats/Cats'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cats />
      </div>
    )
  }
}

export default App
