import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {TodoList} from "../components/TodoList";
import {publicRoutes} from "../routes";

export const AppRouter = isAuth => {
    if (isAuth) {
        return (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                   <Route key={path} path={path} element={<Component />} exact/>
                )}
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<TodoList />} />
        </Routes>
    )
}