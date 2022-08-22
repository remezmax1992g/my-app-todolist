import React from 'react';
import ToDoList, {TaskType} from "./ToDoList";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    editTodolistAC,
    removeTodolistAC,
} from "./reducers/todolists-reducer";
import {
    addTaskAC,
    changeStatusCheckboxAC,
    editTaskAC,
    removeTaskAC,
} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/redux";

export type FilteredValuesType = "all" | "active" | "completed";

export type TasksType = {
    [key: string]: Array<TaskType>
}

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilteredValuesType
}

function App() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksType>(state => state.tasks)
    //function
    const changeFilter = (todolistID: string, filter: FilteredValuesType) => {
        dispatch(changeFilterTodolistAC(todolistID, filter))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }
    const addTask = (todolistID: string, titleInput: string) => {
        dispatch(addTaskAC(todolistID, titleInput))
    }
    const changeStatusCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
      dispatch(changeStatusCheckboxAC(todolistID, taskID, isDone))
    }
    const removeTodolist = (todolistID: string) => {
       dispatch(removeTodolistAC(todolistID))
    }
    const addToDoList = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }
    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(editTaskAC(todolistID, taskID, newTitle))
    }
    const editToDoList = (todoListID: string, newTitle: string) => {
        dispatch(editTodolistAC(todoListID, newTitle))
    }
    //UI
    return (
        <div className={"App"}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Menu
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}><AddItemForm addTask={addToDoList} label={"Type new to-do list"}/></Grid>
                <Grid container spacing={10}>{todolists.map((tl) => {
                    return (<Grid item>
                            <Paper style={{padding:"15px"}}>
                                <ToDoList
                                    key={tl.id}
                                    todolistID={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeStatusCheckBox={changeStatusCheckbox}
                                    removeTodolist={removeTodolist}
                                    editTask={editTask}
                                    editToDoList={editToDoList}
                                /></Paper>
                        </Grid>
                    )
                })}</Grid></Container>
        </div>
    )
}

export default App;
