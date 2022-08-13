import React, {useReducer} from 'react';
import {v1} from "uuid";
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
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeStatusCheckboxAC,
    editTaskAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";

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
    //data
    let todolistID1 = v1();
    let todolistID2 = v1();
    //state
    let [tasks, tasksDispatch] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Coca-cola", isDone: false},
            {id: v1(), title: "Yogurt", isDone: false},
            {id: v1(), title: "Chicken", isDone: false},
        ]
    });
    let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    //function
    const changeFilter = (todolistID: string, filter: FilteredValuesType) => {
        todolistsDispatch(changeFilterTodolistAC(todolistID, filter))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        tasksDispatch(removeTaskAC(todolistID, taskID))
    }
    const addTask = (todolistID: string, titleInput: string) => {
        tasksDispatch(addTaskAC(todolistID, titleInput))
    }
    const changeStatusCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
      tasksDispatch(changeStatusCheckboxAC(todolistID, taskID, isDone))
    }
    const removeTodolist = (todolistID: string) => {
       todolistsDispatch(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }
    const addToDoList = (newTitle: string) => {
        let todolistID = v1()
        todolistsDispatch(addTodolistAC(todolistID, newTitle))
        tasksDispatch(addTodolistAC(todolistID, newTitle))
    }
    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        tasksDispatch(editTaskAC(todolistID, taskID, newTitle))
    }
    const editToDoList = (todoListID: string, newTitle: string) => {
        todolistsDispatch(editTodolistAC(todoListID, newTitle))
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
