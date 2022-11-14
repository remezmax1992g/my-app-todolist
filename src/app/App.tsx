import React, {useEffect} from 'react';
import './App.css';
import {AppBar, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import TodolistsItem from "../features/todolists/TodolistsItem";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {Navigate, Route, Routes} from "react-router-dom";
import {getIsInitialized} from "../reducers/app-reducer";
import {authAction, Login} from "../features/login";
import {useActions} from "../utilits/redux-utilits";


//Component
function App() {
    const {status, isInitialized}  = useAppSelector(state => state.app)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const {deleteLog} = useActions(authAction)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getIsInitialized())
    }, [])

    //UI
    if (!isInitialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}><CircularProgress
            size="200px"/></div>
    }
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
                    {isLogin && <Button onClick={deleteLog} color="inherit">Log out</Button>}
                </Toolbar>
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed style={{minWidth: "90%"}}>
                <Routes>
                    <Route path={"/"} element={<Navigate to="/Login"/>}/>
                    <Route path={"/my-app-todolist"} element={<TodolistsItem/>}/>
                    <Route path={"/Login"} element={<Login/>}/>
                    <Route path={"*"} element={<h1>PAGE IS NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App;
