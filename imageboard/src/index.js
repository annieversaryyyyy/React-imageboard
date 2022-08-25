import React from 'react';
import App from './App';
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import {applyMiddleware,combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import MessageReducers from "./store/reducers/MessageReducers";
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    messages: MessageReducers,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);