import React from 'react';
import uuid from 'node-uuid';

import Note from './Note';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack',
        },
        {
          id: uuid.v4(),
          task: 'Learn React',
        },
        {
          id: uuid.v4(),
          task: 'Do Laundry',
        },
      ],
    };

    this.addNote = this.addNote.bind(this);
  }

  render() {
    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <ul>
          {this.state.notes.map(note => <li key={note.id}>{note.task}</li>)}
        </ul>
      </div>
    );
  }

  addNote() {
    const note = { id: uuid.v4(), task: 'New Task' };
    const oldNotes = this.state.notes;
    this.setState({ notes: [...oldNotes, note] });
  }
}
