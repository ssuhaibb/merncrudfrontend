import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = (props) => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_descriptopn}
        </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_responsible}
        </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            {props.todo.todo_priority}
        </td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>
            <Link to={'/edit/' + props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }

    getTodoList() {
        axios.get('http://localhost:4000/todos')
        .then(response => {
            this.setState({ todos: response.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
       this.getTodoList();
    }

    // getSnapshotBeforeUpdate(prevProps,prevState){
	// 	console.log('--->: TodosList -> getSnapshotBeforeUpdate -> prevState', prevState);
	// 	console.log('--->: TodosList -> getSnapshotBeforeUpdate -> prevProps', prevProps);
    // }
    // componentDidUpdate() {
    //     axios.get('http://localhost:4000/todos')
    //         .then(response => {
    //             this.setState({ todos: response.data })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    todoList = () => {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>
                                Description
                            </th>
                            <th>
                                Responsible
                            </th>
                            <th>
                                Priority
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
