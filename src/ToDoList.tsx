import React, {useCallback} from 'react';
import {FilteredValuesType} from "./App";
import TasksItem from "./components/TasksItem/TasksItem";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import FilteredButton from "./components/FilteredButton/FilteredButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/redux";
import {addTaskAC, changeStatusCheckboxAC, editTaskAC, removeTaskAC} from "./reducers/tasks-reducer";
//type
export type TaskType = {
    //value
    id: string
    title: string
    isDone: boolean
}
type ToDoListPropsType = {
    //value
    todolistID: string
    title: string
    filter: FilteredValuesType
    //function
    changeFilter: (todolistID: string, filter: FilteredValuesType) => void
    removeTodolist: (todolistID: string) => void
    editToDoList: (todolistID: string, newTitle: string) => void
}
//Component
const ToDoList = React.memo((props: ToDoListPropsType) => {
    //store
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todolistID])
    //filtering
    let tasksAfterFiltering: Array<TaskType>
    switch (props.filter) {
        case "active":
            tasksAfterFiltering = tasks.filter(t => !t.isDone)
            break
        case "completed":
            tasksAfterFiltering = tasks.filter(t => t.isDone)
            break
        default:
            tasksAfterFiltering = tasks
    }
    //function
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistID)},[props])
    const editToDoListHandler = useCallback((newTitle: string) => {
        props.editToDoList(props.todolistID, newTitle)
    },[props])
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTaskAC(props.todolistID, newTitle))
    },[dispatch, props.todolistID])
    const removeTaskHandler = useCallback((taskID: string) => {dispatch(removeTaskAC(props.todolistID, taskID))}, [dispatch, props.todolistID])
    const changeStatusCheckboxHandler = useCallback((taskID: string, isDone: boolean) => {dispatch(changeStatusCheckboxAC(props.todolistID, taskID, isDone))},[dispatch, props.todolistID])
    const editTaskHandler = useCallback((taskID: string, newTitle: string) => {dispatch(editTaskAC(props.todolistID, taskID, newTitle))}, [dispatch, props.todolistID])
    //interface
    return (
        <span className={"Todolist"}>
            <h2>
                <EditableSpan title={props.title} onChangeTitle={editToDoListHandler}/>
                 <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                 </IconButton>
            </h2>
            <span>
                <AddItemForm addItem={addTaskHandler} label={"Type task"}/>
                <TasksItem tasks={tasksAfterFiltering}
                           removeTask={removeTaskHandler}
                           changeStatusCheckBox={changeStatusCheckboxHandler}
                           editTask={editTaskHandler}/>
                <FilteredButton todolistID={props.todolistID} filter={props.filter} changeFilter={props.changeFilter}/>
            </span>
        </span>
    );
});

export default ToDoList;