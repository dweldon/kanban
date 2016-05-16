import React from 'react';
import Lane from './Lane';

/* eslint-disable react/prop-types */

export default ({ lanes }) => (
  <div className="lanes">
    {lanes.map(lane => <Lane className="lane" key={lane.id} lane={lane} />)}
  </div>
);
