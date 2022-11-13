import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import ToDoList from "./todolist/ToDoList";
import {useAppSelector} from "../../redux/hook";
import {Navigate} from "react-router-dom";
import {useActions} from "../../utilits/redux-utilits";
import {todosAction} from "./index";

const TodolistsItem = () => {
    //Store
    const todolists = useAppSelector(state => state.todos)
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const {fetchTodolistsTC, createTodolistTC} = useActions(todosAction)

    useEffect(() => {
        if (!isLogin) {
            return
        }
        fetchTodolistsTC()
    }, [fetchTodolistsTC, isLogin])
    if (!isLogin) {
        return <Navigate to="/Login"/>
    }
    return (
        <>
            {!isLogin
                ? <Navigate to="/Login"/>
                : <>
                    <Grid container style={{padding: "10px"}}>
                        <AddItemForm addItem={createTodolistTC}
                                     label={"Type new to-do list"}/>
                    </Grid>
                    <Grid container spacing={3} style={{flexWrap: "nowrap", overflowX: "scroll"}}>{
                        todolists.map((tl) => {
                        return (
                            <Grid item  key={tl.id}>
                                <div style={{width: "300px"}}>
                                    <ToDoList
                                        todolist={tl}
                                    />
                                </div>
                            </Grid>
                        )
                    })}
                    </Grid>
                </>
            }
        </>
    );
};

export default TodolistsItem;