import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import ToDoList from "./todolist/ToDoList";
import {useAppSelector} from "../../redux/hook";
import {FilteredValuesType} from "../../reducers/todolists-reducer";
import {Navigate} from "react-router-dom";
import {useActions} from "../../utilits/redux-utilits";
import {todosAction} from "./todolist";

const TodolistsItem = () => {
    //Store
    const todolists = useAppSelector(state => state.todos)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const {fetchTodolistsTC, updateTodolistTC, deleteTodolistTC, createTodolistTC, changeFilterTodolistAC} = useActions(todosAction)
    //function
    const changeFilter = useCallback((todolistID: string, filter: FilteredValuesType) => {
       changeFilterTodolistAC({todolistID, filter})
    }, [changeFilterTodolistAC])
    const removeTodolist = useCallback((todolistID: string) => {
       deleteTodolistTC({todolistID})
    }, [deleteTodolistTC]);
    const addToDoList = useCallback((newTitle: string) => {
       createTodolistTC({newTitle})
    }, [createTodolistTC]);
    const editToDoList = useCallback((todolistID: string, title: string) => {
       updateTodolistTC({todolistID, title})
    }, [updateTodolistTC]);
    useEffect(() => {
        if(!isLogin){
            return
        }
        fetchTodolistsTC()
    }, [fetchTodolistsTC, isLogin])
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