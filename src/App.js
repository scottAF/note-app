import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false
    };
  }

  toggleNote = () => {  // Arrow funtion syntax
    this.setState({
      showNote: ! this.state.showNote // band operator will reverse the showNote boolean
    });
  }

  render() {
    const { showNote } = this.state; // object destructuring

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        { showNote ? <List /> : <Note /> }
      </div>
    );
  }
}


export default App;
