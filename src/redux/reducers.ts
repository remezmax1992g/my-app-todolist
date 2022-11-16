import {combineReducers} from "redux";
import {todosReducer} from "../reducers/todolists-reducer";
import {tasksReducer} from "../reducers/tasks-reducer";
import {appReducer} from "../reducers/app-reducer";
import {authReducer} from "../reducers/auth-reducer";

export const rootReducer = combineReducers({
    todos: todosReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})