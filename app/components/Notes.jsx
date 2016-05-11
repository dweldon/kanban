import React from 'react';
import Note from './Note';
import styles from './Note.css';

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
