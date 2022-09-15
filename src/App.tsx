import React, {useCallback, useEffect} from 'react';
import ToDoList from "./ToDoList";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {

    changeFilterTodolistAC, createTodolistTC, deleteTodolistTC,
     fetchTodolistsTC, FilteredValuesType,
    updateTodolistTC
} from "./reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "./redux/hook";


//Component
function App() {
    //Store
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    //function
    useEffect(() => {
       dispatch(fetchTodolistsTC())
    }, [dispatch])
    const changeFilter = useCallback((todolistID: string, filter: FilteredValuesType) => {
        dispatch(changeFilterTodolistAC(todolistID, filter))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC(todolistID))
    }, [dispatch]);
    const addToDoList = useCallback((newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }, [dispatch]);
    const editToDoList = useCallback((todoListID: string, newTitle: string) => {
        dispatch(updateTodolistTC(todoListID, newTitle))
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
                    <Typography variant="h6" component="div" sx={{flexGrow: 2}}>
                        Menu
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}><AddItemForm addItem={addToDoList}
                                                                       label={"Type new to-do list"}/></Grid>
                <Grid container spacing={10}>{todolists.map((tl, index) => {
                    return (<Grid item key={index}>
                            <Paper style={{padding: "10px"}}>
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
                })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
