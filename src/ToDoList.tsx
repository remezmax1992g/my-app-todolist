import React from 'react';
import {FilteredValuesType} from "./App";
import TasksItem from "./components/TasksItem/TasksItem";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import FilteredButton from "./components/FilteredButton/FilteredButton";

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
    tasks: Array<TaskType>
    filter: FilteredValuesType
    //function
    changeFilter: (todolistID: string, filter: FilteredValuesType) => void
    removeTask: (todolistID: string, taskID: string) => void
    addTask: (todolistID: string, titleInput: string) => void
    changeStatusCheckBox: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTodolist: (todolistID: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
    editToDoList: (todolistID: string, newTitle: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    //filtering
    let tasksAfterFiltering: Array<TaskType>
    switch (props.filter) {
        case "active":
            tasksAfterFiltering = props.tasks.filter(t => !t.isDone)
            break
        case "completed":
            tasksAfterFiltering = props.tasks.filter(t => t.isDone)
            break
        default:
            tasksAfterFiltering = props.tasks
    }
    //function
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }
    const addItemHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle)
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
                <TasksItem tasks={tasksAfterFiltering} todolistID={props.todolistID} removeTask={props.removeTask}
                           changeStatusCheckBox={props.changeStatusCheckBox} editTask={props.editTask}/>
                <FilteredButton todolistID={props.todolistID} filter={props.filter} changeFilter={props.changeFilter}/>
            </span>
        </span>
    );
};

export default ToDoList;