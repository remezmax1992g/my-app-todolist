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
import {FilteredValuesType} from "../../../reducers/todolists-reducer";
import {TaskStatus, TaskType} from "../../../api/tasks-api";
import {useAppDispatch, useAppSelector} from "../../../redux/hook";
//type
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
const ToDoList = React.memo(({todolistID,title,filter,changeFilter, removeTodolist,editToDoList}: ToDoListPropsType) => {
    //store
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[todolistID])
    //filtering
    let tasksAfterFiltering: Array<TaskType>
    switch (filter) {
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
        dispatch(fetchTaskTC(todolistID))
    },[])
    const removeTodolistHandler = useCallback(() => {
       removeTodolist(todolistID)},[removeTodolist, todolistID])
    const editToDoListHandler = useCallback((newTitle: string) => {
        editToDoList(todolistID, newTitle)
    },[editToDoList, todolistID])
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(createTaskTC(todolistID, newTitle))
    },[dispatch, todolistID])
    const removeTaskHandler = useCallback((taskID: string) => {dispatch(deleteTaskTC(todolistID, taskID))}, [dispatch, todolistID])
    const changeStatusCheckboxHandler = useCallback((taskID: string, status: TaskStatus) => {dispatch(changeStatusTaskTC(todolistID, taskID, status))},[dispatch, todolistID])
    const editTaskHandler = useCallback((taskID: string, newTitle: string) => {dispatch(updateTaskTC(todolistID, taskID, newTitle))}, [dispatch, todolistID])
    //interface
    return (
        <span className={"Todolist"}>
            <h2>
                <EditableSpan title={title} onChangeTitle={editToDoListHandler}/>
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
                <FilteredButton todolistID={todolistID} filter={filter} changeFilter={changeFilter}/>
            </span>
        </span>
    );
});

export default ToDoList;