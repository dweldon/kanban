import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes';

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
    this.editNote = this.editNote.bind(this);
  }

  render() {
    const { notes } = this.state;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes notes={notes} onEdit={this.editNote}/>
      </div>
    );
  }

  addNote() {
    const note = { id: uuid.v4(), task: 'New Task' };
    const oldNotes = this.state.notes;
    this.setState({ notes: [...oldNotes, note] });
  }

  editNote(id, task) {
    if (!task.trim()) return;

    const notes = this.state.notes.map(note => {
      if (note.id == id && task)
        note.task = task;

      return note;
    });

    this.setState({ notes });
  }
}
