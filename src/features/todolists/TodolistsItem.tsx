import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import ToDoList from "./todolist/ToDoList";
import {useAppDispatch, useAppSelector} from "../../redux/hook";
import {
    changeFilterTodolistAC, createTodolistTC,
    deleteTodolistTC,
    fetchTodolistsTC,
    FilteredValuesType, updateTodolistTC
} from "../../reducers/todolists-reducer";
import {Navigate} from "react-router-dom";

const TodolistsItem = () => {
    //Store
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todos)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    //function
    const changeFilter = useCallback((todolistID: string, filter: FilteredValuesType) => {
        dispatch(changeFilterTodolistAC({todolistID: todolistID, filter: filter}))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(deleteTodolistTC({todolistID}))
    }, [dispatch]);
    const addToDoList = useCallback((newTitle: string) => {
        dispatch(createTodolistTC({newTitle}))
    }, [dispatch]);
    const editToDoList = useCallback((todolistID: string, title: string) => {
        dispatch(updateTodolistTC({todolistID, title}))
    }, [dispatch]);
    useEffect(() => {
        if(!isLogin){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])
    if(!isLogin){
        return <Navigate  to="/Login"/>
    }
    return (
        <>
            <Grid container style={{padding: "10px"}}>
                <AddItemForm addItem={addToDoList}
                             label={"Type new to-do list"}/></Grid>
            <Grid container spacing={8}>{todolists.map((tl, index) => {
                return (<Grid item key={index}>
                        <Paper style={{padding: "10px"}}>
                            <ToDoList
                                key={tl.id}
                                todolist={tl}
                                changeFilter={changeFilter}
                                removeTodolist={removeTodolist}
                                editToDoList={editToDoList}
                            /></Paper>
                    </Grid>
                )
            })}
            </Grid>
        </>
    );
};

export default TodolistsItem;