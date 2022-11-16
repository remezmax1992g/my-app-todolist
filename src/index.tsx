import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./redux/redux";
import {HashRouter} from "react-router-dom";

const rerenderEntireTree = () => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(<Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>,
    );
}
rerenderEntireTree();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if(process.env.NODE_ENV === 'development' && module.hot){
    module.hot.accept('./app/App', () => {
        rerenderEntireTree();
    })
}
