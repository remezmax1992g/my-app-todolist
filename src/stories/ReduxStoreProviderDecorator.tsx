import {Provider} from "react-redux";
import React from 'react'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todosReducer} from "../reducers/todolists-reducer";

import thunkMiddleWare from "redux-thunk";
import {appReducer} from "../reducers/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todosReducer,
    app: appReducer
})

export const storyBookStore = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
        return <Provider store={storyBookStore}>{storyFn()}</Provider>
}