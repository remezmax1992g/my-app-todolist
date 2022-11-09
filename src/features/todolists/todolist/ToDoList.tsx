import React, {useCallback, useEffect} from 'react';
import TasksItem from "./TasksItem/TasksItem";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import FilteredButton from "./FilteredButton/FilteredButton";
import {
    changeStatusTaskTC,
    createTaskTC, deleteTaskTC,
    fetchTaskTC,
     updateTaskTC
} from "../../../reducers/tasks-reducer";
import {FilteredValuesType, TodolistEntityType} from "../../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../../api/tasks-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
//type
type ToDoListPropsType = {
    //value
    todolist: TodolistEntityType
    //function
    changeFilter: (todolistID: string, filter: FilteredValuesType) => void
    removeTodolist: (todolistID: string) => void
    editToDoList: (todolistID: string, newTitle: string) => void
}
//Component
const ToDoList = React.memo(({todolist,changeFilter, removeTodolist,editToDoList}: ToDoListPropsType) => {
    //store
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    //filtering
    let tasksAfterFiltering: Array<TaskType>
    switch (todolist.filter) {
        case "active":
            tasksAfterFiltering = tasks.filter(t => t.status === TaskStatus.New)
            break
        case "completed":
            tasksAfterFiltering = tasks.filter(t => t.status === TaskStatus.Completed)
            break
        default:
            tasksAfterFiltering = tasks
    }
    //function
    useEffect(() => {
        dispatch(fetchTaskTC(todolist.id))
    },[])
    const removeTodolistHandler = useCallback(() => {
       removeTodolist(todolist.id)},[removeTodolist, todolist.id])
    const editToDoListHandler = useCallback((newTitle: string) => {
        editToDoList(todolist.id, newTitle)
    },[editToDoList, todolist.id])
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(createTaskTC({todolistID: todolist.id, newTitle}))
    },[dispatch, todolist.id])
    const removeTaskHandler = useCallback((taskID: string) => {dispatch(deleteTaskTC({todolistID: todolist.id, taskID}))}, [dispatch, todolist.id])
    const changeStatusCheckboxHandler = useCallback((taskID: string, status: TaskStatus) => {dispatch(changeStatusTaskTC(todolist.id, taskID, status))},[dispatch, todolist.id])
    const editTaskHandler = useCallback((taskID: string, newTitle: string) => {dispatch(updateTaskTC(todolist.id, taskID, newTitle))}, [dispatch, todolist.id])
    //interface
    return (
        <span className={"Todolist"}>
            <h2>
                <EditableSpan title={todolist.title}
                              onChangeTitle={editToDoListHandler}
                              disabled={todolist.status === "loading"}/>
                 <IconButton onClick={removeTodolistHandler}
                             disabled={todolist.status === "loading"}>
                    <DeleteIcon/>
                 </IconButton>
            </h2>
            <span>
                <AddItemForm addItem={addTaskHandler}
                             label={"Type task"}
                             disabled={todolist.status === "loading"}/>
                <TasksItem tasks={tasksAfterFiltering}
                           removeTask={removeTaskHandler}
                           changeStatusCheckBox={changeStatusCheckboxHandler}
                           editTask={editTaskHandler}/>
                <FilteredButton todolistID={todolist.id} filter={todolist.filter} changeFilter={changeFilter}/>
            </span>
        </span>
    );
});

export default ToDoList;