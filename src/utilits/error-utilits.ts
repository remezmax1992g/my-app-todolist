import {ResponseTodolistType} from "../api/todolists-api";
import {AppDispatch} from "../redux/redux";
import {setError, setStatus} from "../reducers/app-reducer";
import {ResponseTaskType} from "../api/tasks-api";
import {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseTodolistType<D> | ResponseTaskType<D>, dispatch: AppDispatch) => {
    if(data.messages.length !== 0){
        dispatch(setError(data.messages[0]))
    }
    else{
        dispatch(setError("Undefined error"))
    }
    dispatch(setStatus("failed"))
}
export const handleServerNetworkError = (error: AxiosError, dispatch: AppDispatch) => {
    dispatch(setError(error.message ? error.message : "Undefined error"))
    dispatch(setStatus("failed"))
}