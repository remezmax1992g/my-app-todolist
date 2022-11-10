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
}
//Component
const ToDoList = React.memo(({todolist}: ToDoListPropsType) => {
    //store
    const tasks = useAppSelector(state => state.tasks[todolist.id])
    const {createTaskTC, fetchTaskTC, deleteTaskTC, updateTaskTC, changeStatusTaskTC} = useActions(tasksAction)
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
    }, [todolist.id])

    const removeTodolistHandler = useCallback(() => {
        deleteTodolistTC({todolistID: todolist.id})
    }, [todolist.id])
    const editToDoListHandler = useCallback((title: string) => {
        updateTodolistTC({todolistID: todolist.id, title})
    }, [todolist.id])
    const addTaskHandler = useCallback((param: { newTitle: string }) => {
        createTaskTC({todolistID: todolist.id, newTitle: param.newTitle})
    }, [todolist.id])
    const removeTaskHandler = useCallback((taskID: string) => {
        deleteTaskTC({todolistID: todolist.id, taskID})
    }, [todolist.id])
    const changeStatusCheckboxHandler = useCallback((taskID: string, status: TaskStatus) => {
        changeStatusTaskTC({todolistID: todolist.id, taskID, status})
    }, [todolist.id])
    const editTaskHandler = useCallback((taskID: string, newTitle: string) => {
        updateTaskTC({todolistID: todolist.id, taskID, title: newTitle})
    }, [todolist.id])
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
                <FilteredButton todolistID={todolist.id} filter={todolist.filter}
                                changeFilter={changeFilterTodolistAC}/>
            </span>
        </span>
    );
});

export default ToDoList;