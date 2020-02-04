import { Observable, BehaviorSubject, from } from 'rxjs';
import { map } from 'rxjs/operators';
import FetchApi from './fetch-api';

// export interface Todo {
//     id: string;
//     text: string;
//     complete: boolean;
// }

export default class TodoService {

    _todosMap = new Map();
    _todos$ = new BehaviorSubject(new Map());

    constructor() {
        this.syncWithServer();
    }

    /** return list of todo items */
    getTodos() {
        return this._todos$.pipe(map(todoMap => Array.from(todoMap.values())));
    }

    /** delete locally, then try to delete with server */
    deleteTodo(id) {
        // handle local
        this._todosMap.delete(id);
        this._todos$.next(this._todosMap);

        // update server
        FetchApi
            .delete(`/todo/${id}`)
            .then()
            .catch(() => {
                alert('Error removing todo');
                this.syncWithServer();
            });
    }

    /** upsert locally, then try to upsert with server */
    updateTodo(todo) {
        // handle local
        this._todosMap.set(todo.id, todo);
        this._todos$.next(this._todosMap);

        // update server
        FetchApi
            .put(`/todo/${todo.id}`, todo)
            .then()
            .catch(() => {
                alert('There was an error updating the todo');
                this.syncWithServer();
            });

    }

    addTodo(text) {
        // handle local
        this._todosMap.set('temp', { id: 'temp', text, complete: false });
        this._todos$.next(this._todosMap);

        // update server
        FetchApi
            .post('/todo', { text, complete: false })
            .then((newTodo) => {
                this._todosMap.delete('temp');
                this._todosMap.set(newTodo.id, newTodo);
                this._todos$.next(this._todosMap)
            })
            .catch(() => {
                alert('There was an error creating the todo');
                this.syncWithServer();
            });
    }

    /** sets map to the return todo list from the server */
    syncWithServer() {
        FetchApi
            .get('/todo')
            .then(todos => {
                const newMap = new Map();
                todos.forEach(todo => {
                    newMap.set(todo.id, todo);
                });
                return newMap;
            }).then(newMap => {
                this._todosMap = newMap;
                this._todos$.next(newMap);
            })
            .catch(() => alert('There was an error getting todos'));
    }
}