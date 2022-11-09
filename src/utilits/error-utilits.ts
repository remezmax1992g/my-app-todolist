import {ResponseTodolistType} from "../api/todolists-api";
import {setError, setStatus} from "../reducers/app-reducer";
import {ResponseTaskType} from "../api/tasks-api";
import {AxiosError} from "axios";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseTodolistType<D> | ResponseTaskType<D>, dispatch: Dispatch) => {
    if(data.messages.length !== 0){
        dispatch(setError({error: data.messages[0]}))
    }
    else{
        dispatch(setError({error: "Undefined error"}))
    }
    dispatch(setStatus({status: "failed"}))
}
export const handleServerNetworkError = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setError({error: error.message ? error.message : "Undefined error"}))
    dispatch(setStatus({status: "failed"}))
}