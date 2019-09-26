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
      notes: [],
      note: {},
      newTag: false
    };
  }

  toggleNote = () => {  // Arrow funtion syntax
    this.setState({
      showNote: ! this.state.showNote, // band operator will reverse the showNote boolean
      note: {}
    });
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
    .then((res) => this.setState({ notes: res.data }) )
    .catch((err) => console.log(err.response.data));
  }

  getNote = (id) => {    
    axios.get(urlFor(`notes/${id}`))
    .then((res) => this.setState({ note: res.data, showNote: true }) )
    .catch((err) => console.log(err.response.data));
  }

  performSubmitRequest = (data, id) => {
    if (id) {
      // TODO: Cheack ID to perform update request
      return axios.patch(urlFor(`notes/${id}`), data);
    } else {
      return axios.post(urlFor('notes'), data);
    }
  }

  submitNote = (data, id) => {
    this.performSubmitRequest(data, id)
    .then((res) => this.setState({ showNote: false }) )
    .catch((err) => console.log(err.response.data) );
  }

  deleteNote = (id) => {
    const newNoteState = this.state.notes.filter((note) => note.id !== id);
    axios.delete(urlFor(`notes/${id}`))
    .then((res) => this.setState({ notes: newNoteState }))
    .catch((err) => console.log(err.response.data) );
  }

  showTagForm = () => {
    this.setState({
      newTag: true
    });
  }

  closeTagForm = () => {
    this.setState({
      newTag: false
    });
  }

  submitTag = (data, noteId) => {
    axios.post(urlFor(`notes/${noteId}/tags`), data)
    .then((res) => this.getNote(noteId) )
    .catch((err) => console.log(err.response.data) );
  }

  deleteTag = (noteId, id) => {
    axios.delete(urlFor(`tags/${id}`))
    .then((res) => this.getNote(noteId) )
    .catch((err) => console.log(err.response.data));
  }


  render() {
    const { showNote, notes, note, newTag } = this.state; // object destructuring

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        { showNote ? 
          <Note 
            note={note}
            submitNote={this.submitNote}
            newTag={newTag}
            submitTag={this.submitTag}
            showTagForm={this.showTagForm}
            closeTagForm={this.closeTagForm}
            deleteTag={this.deleteTag}
          /> 
          : 
          <List 
            getNotes={this.getNotes} 
            notes={notes} 
            getNote={this.getNote}
            deleteNote={this.deleteNote}
          /> 
        }
      </div>
    );
  }
}


export default App;