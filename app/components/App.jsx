import React from 'react';
import AltContainer from 'alt-container';

import Notes from './Notes';
import styles from './App.sss';
import NoteActions from 'actions/NoteActions';
import NoteStore from 'stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote() {
    NoteActions.create({ task: 'New Task' });
  }

  editNote(id, task) {
    if (!task.trim()) return;

    NoteActions.update({ id, task });
  }

  deleteNote(id, e) {
    e.stopPropagation();

    NoteActions.delete(id);
  }

  render() {
    return (
      <div>
        <button className={styles.add} onClick={this.addNote}>+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{ notes: () => NoteStore.getState().notes }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
}
