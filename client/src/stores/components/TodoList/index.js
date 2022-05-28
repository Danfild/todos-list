import {makeAutoObservable} from 'mobx';
import {$host} from '../../../http';

export default class TodoListStore {
     todos = [];
     todosData = {};

    constructor() {
        makeAutoObservable(this);

        this.getTodos();
    }

     setTodos = (todos) => {
        this.todos = todos;
    }

     setTodosData = (todosData) => {
        this.todosData = todosData;
    }

    getTodos = async() => {
        const {username, status, page, limit} = this.todosData;

        const url = '/todos';
        try {
            const req = await $host.get(url,
                {params: {username, status, page, limit}})
            console.log(await req.data)
            this.setTodos();
        } catch (e) {
            console.log(e)
        }
    }

    createTodos = async() => {
        const url = '/createtodo';
        const {username, status, text, email} = this.todosData;
        try {
            const req = await $host.post(url,
                {body: {username, status, text, email}})
            console.log(await req.data)

        } catch (e) {
            console.log(e)
        }
    }
}
