import React, {useCallback} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/redux";
//types
export type FilteredValuesType = "all" | "active" | "completed";
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type TodolistsType = {
    //value
    id: string,
    title: string,
    filter: FilteredValuesType
}
//Component
function App() {
    //Store
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistsType>>(state => state.todolists)
    //function
    const changeFilter = useCallback((todolistID: string, filter: FilteredValuesType) => {
        dispatch(changeFilterTodolistAC(todolistID, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
       dispatch(removeTodolistAC(todolistID))
    }, [dispatch]);
    const addToDoList = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    },[dispatch]);
    const editToDoList = useCallback((todoListID: string, newTitle: string) => {
        dispatch(editTodolistAC(todoListID, newTitle))
    }, [dispatch]);
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
                <Grid container style={{padding: "20px"}}><AddItemForm addItem={addToDoList} label={"Type new to-do list"}/></Grid>
                <Grid container spacing={10}>{todolists.map((tl, index) => {
                    return (<Grid item key={index}>
                            <Paper style={{padding:"15px"}}>
                                <ToDoList
                                    key={tl.id}
                                    todolistID={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    editToDoList={editToDoList}
                                /></Paper>
                        </Grid>
                    )
                })}</Grid></Container>
        </div>
    )
}

export default App;
