import React from 'react';
import Note from './Note';

export default ({ notes, onEdit, onDelete }) => (
  <ul>
  {notes.map(note =>
    <li key={note.id}>
      <Note
        task={note.task}
        onEdit={onEdit.bind(null, note.id)}
        onDelete={onDelete.bind(null, note.id)}
      />
    </li>
  )}
  </ul>
);
