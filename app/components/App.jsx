import React from 'react';
import uuid from 'node-uuid';
import Notes from './Notes';
import styles from './App.sss';

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
    this.deleteNote = this.deleteNote.bind(this);
  }

  render() {
    const { notes } = this.state;

    return (
      <div>
        <button className={styles.add} onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
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

  deleteNote(id, e) {
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id),
    });
  }
}
