import {makeAutoObservable, set} from 'mobx';
import {$host} from '../../../http';

export default class TodoListStore {
    todos = [];
    todosData = {};
    limit = 3;
    offset = 0;
    count = 0;
    openDialogWindow = false;
    openEditWindow = false;
    openChangeStatusWindow = false;
    openAlert = false;
    alertMessage = '';
    checkedItems = [];
    currentTodo = {};
    todosStatus = '';

    constructor() {
        makeAutoObservable(this);

        this.getTodos();
    }

    get getEmail() {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }

        return Boolean(validateEmail(this.todosData?.email));
    }

    get getName() {
        return this.todosData?.username?.length;
    }

    get getDescriptionTodo() {
        return this.todosData?.text?.length;
    }

    get getValidationFields() {
        return this.getDescriptionTodo && this.getName && this.getEmail;
    }

    setTodos = (todos) => {
        this.todos = todos;
    }

    setLimit = (limit) => {
        this.limit = limit.target.value;
        this.getTodos()
    }

    setOffset = (event, value) => {
        this.offset = value;

        this.getTodos()
    }

    setCount = (count) => {
        this.count = count;
    }

    setOpenDialogWindow = (bool) => {
        this.openDialogWindow = bool;
    }

    setOpenEditWindow = (bool) => {
        this.openEditWindow = bool;
    }

    setOpenChangeStatusWindow = (bool) => {
        this.openChangeStatusWindow = bool;
    }

    setCurrentTodo = (id, text) => {
        console.log(id, text)
        this.currentTodo = {id, text}
    }

    setTodosData = (val) => {
        set(this.todosData, val);
    }

    setTodosStatus = (val) => {
        console.log(val)
        this.todosStatus = val;
    }

    setOpenAlert = (bool) => {
        this.openAlert = bool;
    }

    setSuccess = () => {
        this.setOpenDialogWindow(false);
        this.setOpenAlert(true)
    }

    setAlertMessage = (text) => {
        this.alertMessage = text;
    }

    setCheckedItem = (todoId, isChecked) => {
        const todo = this.todos.find(({id}) => id === todoId);

        todo.isChecked = isChecked;
        this.checkedItems = [...this.checkedItems, todoId]
    }

    getTodos = async (params) => {
        const {username, status} = params || {};
        const {limit, offset: page} = this;
        const orders = [{
            field: 'createdAt',
            predicate: 'DESC'
        }]

        const url = '/todos';
        try {
            const {data: todos} = await $host.get(url,
                {
                    params: {username, status, page, limit, orders}
                })
            console.log(todos)
            this.setTodos(todos);
            this.getCount();
        } catch (e) {
            console.log(e)
        }
    }

    createTodos = async () => {
        const url = '/createtodo';
        const {username, text, email} = this.todosData;
        try {
            const req = await $host.post(url,
                {username, text, email})

            this.setAlertMessage(req.data.message)
            this.setSuccess();
        } catch (e) {
            console.log(e)
        }
    }

    updateTodo = async (id) => {
        const url = '/updatetodo';
        let body = {id};
        const {status, text} = this.currentTodo;

        if (text) {
            body.text = text;
        }

        if (status) {
            body.status = status;
        }

        try {
            const req = await $host.put(url, body);

            this.setAlertMessage(req.data.message)
            this.getTodos();
            this.setSuccess();
        } catch (e) {
            console.log(e)
        }
    }

    updateStatusTodo = async () => {
        const url = '/updatetodos';
        console.log(this.checkedItems)
        const body = {ids: this.checkedItems, status: this.todosStatus};

        try {
            const req = await $host.post(url, body)

            this.checkedItems = [];
            this.setAlertMessage(req.data.message)
            this.getTodos();
            this.setSuccess();
        } catch (e) {
            console.log(e)
        }
    }

    getCount = async () => {
        const url = '/getcounttodo';
        try {
            const {data: count} = await $host.get(url)

            this.setCount(count)
        } catch (e) {
            console.log(e)
        }
    }
}
