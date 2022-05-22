import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Login} from "./components/Login";
import {Auth} from "./components/Auth";

export const useRoutes = isAuth => {
    console.log(isAuth)
    if (isAuth) {
        return (
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/auth" element={<Auth />}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/auth" element={<Auth />} />
        </Routes>
    )
}