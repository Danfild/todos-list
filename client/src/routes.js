import {AUTH_ROUTE, LOGIN_ROUTE, TODOS_ROUTE} from "./utils/consts";
import {TodoList} from "./components/TodoList";
import {Auth} from "./components/Auth";
import {Login} from "./components/Login";

export const publicRoutes = [
    {
        path: TODOS_ROUTE,
        Component: TodoList
    },
    {
        path: AUTH_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]