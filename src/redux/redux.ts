import {ActionTodolistType} from "../reducers/todolists-reducer";
import thunkMiddleWare, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStatusErrorActionType} from "../reducers/app-reducer";
import {ActionAuthType} from "../reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {FieldErrorType} from "../api/auth-api";
import {rootReducer} from "./reducers";


export type AppActionType = ActionTodolistType | AppStatusErrorActionType | ActionAuthType
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionType>
export type AppThunkError = {
    rejectValue: {
        errors?: string[],
        fieldsErrors?: Array<FieldErrorType>
    }
}
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare))
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

// @ts-ignore
window.store = store

if(process.env.NODE_ENV === 'development' && module.hot){
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}