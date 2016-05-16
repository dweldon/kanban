import React from 'react';
import Notes from './Notes';
import styles from './App.sss';
import NoteActions from 'actions/NoteActions';
import NoteStore from 'stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();

    this.storeChanged = this.storeChanged.bind(this);
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
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
}
