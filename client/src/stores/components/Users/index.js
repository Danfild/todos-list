import {makeAutoObservable} from 'mobx'


export default class UsersStore {
    users = [];
    isAuth = true;

    constructor() {
        makeAutoObservable(this);

    }
}
