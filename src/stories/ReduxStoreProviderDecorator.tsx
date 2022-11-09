import {Provider} from "react-redux";
import React from 'react'
import {combineReducers} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todosReducer} from "../reducers/todolists-reducer";
import thunkMiddleWare from "redux-thunk";
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todos: todosReducer,
    app: appReducer,
    auth: authReducer
})

// export const storyBookStore = createStore(rootReducer, applyMiddleware(thunkMiddleWare));
export const storyBookStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
        return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const HashRouterDecorator = (storyFn: () => JSX.Element) => {
    return <HashRouter>{storyFn()}</HashRouter>
}