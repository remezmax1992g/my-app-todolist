import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";
import TodolistsItem from "../features/todolists/TodolistsItem";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import Login from "../features/login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {getIsInitialized} from "../reducers/app-reducer";
import {deleteLog} from "../reducers/auth-reducer";


//Component
function App() {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getIsInitialized())
    },[])
    const logoutHandler = useCallback(() => {dispatch(deleteLog())}, [dispatch])
    //UI
    if(!isInitialized){
        return <div style={{position: "fixed", top: "30%", textAlign:"center", width: "100%"}}><CircularProgress size="200px"/></div>
    }
    return (
        <BrowserRouter>
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
                        {isLogin && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                    </Toolbar>
                    {status === "loading" && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/my-app-todolist"} element={<TodolistsItem/>}/>
                        <Route path={"/my-app-todolist/Login"} element={<Login/>}/>
                        <Route path={"/my-app-todolist/404"} element={<h1>PAGE IS NOT FOUND</h1>}/>
                        <Route path={"*"} element={<Navigate to={"/my-app-todolist/404"}/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App;
