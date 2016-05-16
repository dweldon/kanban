import uuid from 'node-uuid';
import alt from 'libs/alt';
import LaneActions from 'actions/LaneActions';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    const newLane = { ...{ notes: [], id: uuid.v4() }, ...lane };
    this.setState({ lanes: this.lanes.concat(newLane) });
  }

  attachToLane({ laneId, noteId }) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        return { ...lane, ...{ notes: lane.notes.concat(noteId) } };
      }
      return lane;
    });

    this.setState({ lanes });
  }

  detachFromLane({ laneId, noteId }) {
    const lanes = this.lanes.map(lane => {
      if (lane.id === laneId) {
        const newNotes = lane.notes.filter(note => note !== noteId);
        return { ...lane, ...{ notes: newNotes } };
      }
      return lane;
    });
    this.setState({ lanes });
  }
}

export default alt.createStore(LaneStore, 'LaneStore');
