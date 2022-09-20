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

const TodolistsItem = () => {
    //Store
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    //function
    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])
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
    return (
        <>
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
        </>
    );
};

export default TodolistsItem;