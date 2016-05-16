import React from 'react';
import AltContainer from 'alt-container';

import styles from './App.sss';

import Lanes from './Lanes';
import LaneActions from 'actions/LaneActions';
import LaneStore from 'stores/LaneStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addLane = this.addLane.bind(this);
  }

  addLane() {
    LaneActions.create({ name: 'New Lane' });
  }

  render() {
    return (
      <div>
        <button className={styles.add} onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{ lanes: () => LaneStore.getState().lanes || [] }}
        >
          <Lanes />
        </AltContainer>
      </div>
    );
  }
}
