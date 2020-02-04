import React from 'react';
import { TodoInput } from './todo-input';
import { TodoItem } from './todo-item';
import TodoService from '../../todo.service';
import Tachyons from 'tachyons/css/tachyons.min.css'

export class TodoList extends React.Component {

    todoService = new TodoService();
    constructor(props) {
        super(props);
        this.state = { todos: [], completedCount: 0, pendingCount: 0 };
    }

    componentDidMount() {
        this.subscription = this.todoService.getTodos().subscribe(todos => {
            /** get completed and pending todo counts and set them */
            const completedCount = todos.filter(todo => todo.complete).length;
            const pendingCount = todos.length - completedCount;

            this.setState({todos, completedCount, pendingCount })
        });
        this.todoService.syncWithServer();
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return <div align="center" className="baskerville">
            <h1 className="w-60 mv3 pa3 shadow-3 bg-washed-red black">Todos - Completed {this.state.completedCount} - Pending {this.state.pendingCount}</h1>
            <div className="w-60 mv3 pa3 shadow-3 bg-washed-green black">
                <TodoInput className="w-80" todoService={this.todoService}></TodoInput>
            </div>
            <div className="flex flex-column w-60 bg-near-white shadow-4">
                {this.state.todos.map(todo => <TodoItem key={todo.id} todo={todo} todoService={this.todoService}></TodoItem>)}
            </div>
        </div>
    }
}