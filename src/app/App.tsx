import React from 'react';
import './App.css';
import {AppBar, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import TodolistsItem from "../features/todolists/TodolistsItem";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "../redux/hook";


//Component
function App() {
    const status = useAppSelector(state => state.app.status)
    //UI
    return (
        <div className={"App"}>
            <ErrorSnackbar/>
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
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsItem/>
            </Container>
        </div>
    )
}

export default App;
