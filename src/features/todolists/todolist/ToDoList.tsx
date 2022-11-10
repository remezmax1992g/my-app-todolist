import React, {useCallback, useEffect} from 'react';
import TasksItem from "./TasksItem/TasksItem";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton} from "@mui/material";
import FilteredButton from "./FilteredButton/FilteredButton";
import {TodolistEntityType} from "../../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../../api/tasks-api";
import {useAppSelector} from "../../../redux/hook";
import {useActions} from "../../../utilits/redux-utilits";
import {tasksAction, todosAction} from "./index";
//type
type ToDoListPropsType = {
    //value
    todolist: TodolistEntityType
    //function
    removeTodolist: (param: {todolistID: string}) => void
    editToDoList: (todolistID: string, newTitle: string) => void
}
//Component
const ToDoList = React.memo(({todolist, removeTodolist, editToDoList}: ToDoListPropsType) => {
    //store
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const {updateTaskTC, createTaskTC, deleteTaskTC, fetchTaskTC, changeStatusTaskTC} = useActions(tasksAction)
    const {changeFilterTodolistAC} =useActions(todosAction)
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
        fetchTaskTC(todolist.id)
    },[todolist.id, fetchTaskTC])
    const removeTodolistHandler = useCallback(() => {
       removeTodolist({todolistID: todolist.id})},[removeTodolist, todolist.id])
    const editToDoListHandler = useCallback((newTitle: string) => {
        editToDoList(todolist.id, newTitle)
    },[editToDoList, todolist.id])
    const addTaskHandler = useCallback((param:{newTitle: string}) => {createTaskTC({todolistID: todolist.id, newTitle: param.newTitle})},[todolist.id, createTaskTC])
    const removeTaskHandler = useCallback((taskID: string) => {deleteTaskTC({todolistID: todolist.id, taskID})}, [todolist.id, deleteTaskTC])
    const changeStatusCheckboxHandler = useCallback((taskID: string, status: TaskStatus) => {changeStatusTaskTC({todolistID:todolist.id, taskID, status})},[todolist.id, changeStatusTaskTC])
    const editTaskHandler = useCallback((taskID: string, newTitle: string) => {updateTaskTC({todolistID:todolist.id, taskID, title: newTitle})}, [todolist.id, updateTaskTC])
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
                <FilteredButton todolistID={todolist.id} filter={todolist.filter} changeFilter={changeFilterTodolistAC}/>
            </span>
        </span>
    );
});

export default ToDoList;