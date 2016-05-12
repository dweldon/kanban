import React from 'react';
import Note from './Note';
import styles from './Note.sss';

/* eslint-disable react/prop-types, react/jsx-no-bind */

export default ({ notes, onEdit, onDelete }) => (
  <ul className={styles.notes}>
  {notes.map(note =>
    <li className={styles.note} key={note.id}>
      <Note
        task={note.task}
        onEdit={onEdit.bind(null, note.id)}
        onDelete={onDelete.bind(null, note.id)}
      />
    </li>
  )}
  </ul>
);
