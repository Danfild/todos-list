import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {AppRouter} from "./components/AppRouter";
import {NavBar} from './components/NavBar'

const App = observer( () => {
    const routes = AppRouter(true);

    return (
        <Router>
            <NavBar />
            {routes}
        </Router>
    );
})

export default App;