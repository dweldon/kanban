import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    this.edit = this.edit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  render() {
    return this.state.editing ? this.renderEdit() : this.renderNote();
  }

  renderEdit() {
    return <input type='text'
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />;
  }

  renderNote() {
    const { onDelete } = this.props;

    return (
      <div onClick={this.edit}>
        <span>{this.props.task}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  }

  renderDelete() {
    return <button onClick={this.props.onDelete}>x</button>;
  }

  edit() {
    this.setState({ editing: true });
  }

  checkEnter(e) {
    if (e.key === 'Enter')
      this.finishEdit(e);
  }

  finishEdit(e) {
    const value = e.target.value;
    const { onEdit } = this.props;

    if (onEdit) {
      onEdit(value);
      this.setState({ editing: false });
    }
  }
}
