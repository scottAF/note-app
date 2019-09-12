import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import axios from 'axios';
import urlFor from './helpers/urlFor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: []
    };
  }

  toggleNote = () => {  // Arrow funtion syntax
    this.setState({
      showNote: ! this.state.showNote // band operator will reverse the showNote boolean
    });
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState({ notes: res.data }) )
    .catch((err) => console.log(err.response.data));
  }

  render() {
    const { showNote, notes } = this.state; // object destructuring

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        { showNote ? 
          <Note /> 
          : 
          <List getNotes={this.getNotes} notes={notes}/> 
        }
      </div>
    );
  }
}


export default App;
