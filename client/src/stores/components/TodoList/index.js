import {makeAutoObservable, set} from 'mobx';
import {$host} from '../../../http';

export default class TodoListStore {
     todos = [];
     todosData = {};
     limit = 3;
     offset = 0;
     count = 0;
     openDialogWindow = false;
     openAlert = false;
     alertMessage = '';

    constructor() {
        makeAutoObservable(this);

        this.getTodos();
    }

   get getEmail()  {
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

    get getValidationFields  ()  {

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
        console.log(bool)
        this.openDialogWindow = bool;
    }

     setTodosData = (val) => {
         console.log(this.todosData)

         set(this.todosData, val);
    }

    setOpenAlert = (bool) => {
        this.openAlert = bool;
    }

    setSuccess = () => {
        this.setOpenDialogWindow(false);
        this.setOpenAlert(true)
    }

    setAlertMessage = (text) => {
        console.log(text)
        this.alertMessage = text;
    }

    getTodos = async(params) => {
        const {username, status} = params || {};
        const {limit, offset: page} = this;
        const orders = [{
                field: 'createdAt',
                predicate: 'DESC'
            }]

        console.log(orders)
        const url = '/todos';
        try {
            const {data: todos} = await $host.get(url,
                {
                    params: {username, status, page, limit, orders}})

            this.setTodos(todos);
            this.getCount();
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

            console.log(req)
        this.setAlertMessage(req.data.message)
        this.setSuccess();
        } catch (e) {
            console.log(e)
        }
    }

    getCount = async() => {
        const url = '/getcounttodo';
        try {
            const {data: count} = await $host.get(url)

            this.setCount(count)
        } catch (e) {
            console.log(e)
        }
    }
}
