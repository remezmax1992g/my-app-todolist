import React from 'react';
import {FilteredValuesType, TasksType} from "./App";
import TasksItem from "./components/TasksItem/TasksItem";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import FilteredButton from "./components/FilteredButton/FilteredButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/redux";
import {addTaskAC, changeStatusCheckboxAC, editTaskAC, removeTaskAC} from "./reducers/tasks-reducer";

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

const ToDoList = (props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)
    //filtering
    let tasksAfterFiltering: Array<TaskType>
    switch (props.filter) {
        case "active":
            tasksAfterFiltering = tasks[props.todolistID].filter(t => !t.isDone)
            break
        case "completed":
            tasksAfterFiltering = tasks[props.todolistID].filter(t => t.isDone)
            break
        default:
            tasksAfterFiltering = tasks[props.todolistID]
    }
    //function
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addItemHandler = (newTitle: string) => {
        dispatch(addTaskAC(props.todolistID, newTitle))
    }
    const editToDoListHandler = (newTitle: string) => {
        props.editToDoList(props.todolistID, newTitle)
    }
    //interface
    return (
        <span className={"Todolist"}>
            <h2>
                <EditableSpan title={props.title} onChange={editToDoListHandler}/>
                 <IconButton onClick={removeTodolist}>
                    <DeleteIcon/>
                 </IconButton>
            </h2>
            <span>
                <AddItemForm addTask={addItemHandler} label={"Type task"}/>
                <TasksItem tasks={tasksAfterFiltering} todolistID={props.todolistID} removeTask={(taskID) => dispatch(removeTaskAC(props.todolistID, taskID))}
                           changeStatusCheckBox={(taskID, isDone) => dispatch(changeStatusCheckboxAC(props.todolistID, taskID, isDone))} editTask={(taskId, newTitle) => dispatch(editTaskAC(props.todolistID, taskId, newTitle))}/>
                <FilteredButton todolistID={props.todolistID} filter={props.filter} changeFilter={props.changeFilter}/>
            </span>
        </span>
    );
};

export default ToDoList;