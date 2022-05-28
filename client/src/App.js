import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'materialize-css';
import {AppRouter} from "./components/AppRouter";

const App = () => {
    const routes = AppRouter(false);

    return (
        <Router>
            <div className={"container"}>
                {routes}
            </div>
        </Router>
    );
}

export default App;