import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);
    this.notes = [];
  }

  create(note) {
    this.setState({
      notes: this.notes.concat({ ...note, id: uuid.v4() }),
    });
  }

  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        return { ...note, ...updatedNote };
      }
      return note;
    });

    this.setState({ notes });
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id),
    });
  }
}

export default alt.createStore(NoteStore, 'NoteStore');
