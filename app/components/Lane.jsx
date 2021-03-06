import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from 'actions/NoteActions';
import NoteStore from 'stores/NoteStore';
import LaneActions from 'actions/LaneActions';

/* eslint-disable react/prop-types */

export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  editNote(id, task) {
    // Don't modify if trying to set an empty value
    if (!task.trim()) {
      return;
    }

    NoteActions.update({ id, task });
  }

  addNote() {
    const laneId = this.props.lane.id;
    const note = NoteActions.create({ task: 'New Task' });

    LaneActions.attachToLane({ noteId: note.id, laneId });
  }

  deleteNote(noteId, e) {
    // Avoid bubbling to edit
    e.stopPropagation();

    const laneId = this.props.lane.id;
    LaneActions.detachFromLane({ laneId, noteId });
    NoteActions.delete(noteId);
  }

  render() {
    const { lane, ...props } = this.props;

    return (
      <div {...props}>
        <div className="lane-header">
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
          <div className="lane-name">{lane.name}</div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{ notes: () => NoteStore.getNotesByIds(lane.notes) }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }
}
