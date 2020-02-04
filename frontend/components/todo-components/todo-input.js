import React from 'react';

const ENTER_KEY_CODE = 13;

export class TodoInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currentText: '' }
  }

  handleChange = (e) => {
    this.setState({ currentText: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) this.createTodo();
  }

  createTodo = () => {
    this.props.todoService.addTodo(this.state.currentText)
    this.setState({currentText: ''})
  }

  render() {
    return <input className="bn w-80 bg-near-white pa3 shadow-3"
      autoFocus
      onChange={this.handleChange}
      onKeyDown={this.handleKeyDown}
      placeholder="What needs to be done?"
      value={this.state.currentText}
    />
  }
}