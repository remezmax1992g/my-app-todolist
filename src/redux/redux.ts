import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionTodolistType, todolistsReducer} from "../reducers/todolists-reducer";
import {ActionTaskType, tasksReducer} from "../reducers/tasks-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppStatusErrorActionType} from "../reducers/app-reducer";
import {ActionAuthType, authReducer} from "../reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export type AppActionType = ActionTodolistType | ActionTaskType | AppStatusErrorActionType | ActionAuthType
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionType>

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

// @ts-ignore
window.store = store