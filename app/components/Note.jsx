import React from 'react';
import styles from './Note.sss';

/* eslint-disable react/prop-types */

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.edit = this.edit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  edit() {
    this.setState({ editing: true });
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    const value = e.target.value;
    const { onEdit } = this.props;

    if (onEdit) {
      onEdit(value);
      this.setState({ editing: false });
    }
  }

  renderDelete() {
    return (<button
      className={styles.delete}
      onClick={this.props.onDelete}
    >x</button>);
  }

  renderNote() {
    const { onDelete } = this.props;

    return (
      <div onClick={this.edit}>
        <span className={styles.task}>{this.props.task}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  }

  renderEdit() {
    return (<input
      type="text"
      autoFocus
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />);
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderNote();
  }
}
