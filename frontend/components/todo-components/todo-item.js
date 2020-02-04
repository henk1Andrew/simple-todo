import React from 'react';

export class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleCompletion = (todo) => {
    this.props.todoService.updateTodo({ ...todo, complete: !todo.complete });
  }

  render() {
    return <div className="center flex justify-between w-90 mv1 pa1 shadow-3 bg-blue washed-red">
      <i className="material-icons dim" onClick={() => this.toggleCompletion(this.props.todo)}>
        {this.props.todo.complete ? 'check_box' : 'check_box_outline_blank'}
      </i>

      <label className={`v-mid flex-auto ${this.props.todo.complete ? "strike" : ""}`}>{this.props.todo.text}</label>

      <i className="material-icons dim" onClick={() => this.props.todoService.deleteTodo(this.props.todo.id)}>
        delete_forever
      </i>
    </div>
  }
}