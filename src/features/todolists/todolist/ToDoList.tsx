import React, {useCallback, useEffect} from 'react';
import TasksItem from "./TasksItem/TasksItem";
import AddItemForm from "../../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {IconButton, Paper} from "@mui/material";
import FilteredButton from "./FilteredButton/FilteredButton";
import {TodolistEntityType} from "../../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../../api/tasks-api";
import {useAppSelector} from "../../../redux/hook";
import {useActions} from "../../../utilits/redux-utilits";
import {tasksAction, todosAction} from "../index";
//type
type ToDoListPropsType = {
    //value
    todolist: TodolistEntityType
}
//Component
const ToDoList = React.memo(({todolist}: ToDoListPropsType) => {
    //store
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const {createTaskTC, fetchTaskTC} = useActions(tasksAction)
    const {changeFilterTodolistAC, updateTodolistTC, deleteTodolistTC} = useActions(todosAction)
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
    }, [fetchTaskTC, todolist.id])

    const removeTodolistHandler = useCallback(() => {
        deleteTodolistTC({todolistID: todolist.id})
    }, [deleteTodolistTC, todolist.id])
    const editToDoListHandler = useCallback((title: string) => {
        updateTodolistTC({todolistID: todolist.id, title})
    }, [updateTodolistTC, todolist.id])
    const addTaskHandler = useCallback((param: { newTitle: string }) => {
        createTaskTC({todolistID: todolist.id, newTitle: param.newTitle})
    }, [createTaskTC, todolist.id])
    //interface
    return (
        <Paper className={"Todolist"} style={{padding: "10px", position: "relative"}}>
            <IconButton onClick={removeTodolistHandler}
                        disabled={todolist.status === "loading"}
                        style={{position: "absolute", top:"-5px", left: "260x"}}>
                    <DeleteIcon/>
            </IconButton>
            <h2>
                <EditableSpan title={todolist.title}
                              onChangeTitle={editToDoListHandler}
                              disabled={todolist.status === "loading"}/>

            </h2>
            <span>
                <AddItemForm addItem={addTaskHandler}
                             label={"Type task"}
                             disabled={todolist.status === "loading"}/>
                <TasksItem tasks={tasksAfterFiltering}
                           todolistID={todolist.id}/>
                <FilteredButton todolistID={todolist.id} filter={todolist.filter}
                                changeFilter={changeFilterTodolistAC}/>
            </span>
        </Paper>
    );
});

export default ToDoList;