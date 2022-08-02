import React, {useState} from 'react';
import {v1} from "uuid";
import ToDoList, {TaskType} from "./ToDoList";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import Button from "@mui/material/Button";

export type FilteredValuesType = "all" | "active" | "completed";

type TasksType = {
    [key: string]: Array<TaskType>
}

type todolistsType = {
    id: string,
    title: string,
    filter: FilteredValuesType
}

function App() {
    //data
    let todolistID1 = v1();
    let todolistID2 = v1();
    //state
    let [tasks, setTasks] = useState<TasksType>({
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
    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    //function
    const changeFilter = (todolistID: string, filter: FilteredValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
    }
    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
        // setTasks(tasks.filter(t => t.id !== taskID))
    }
    const addTask = (todolistID: string, titleInput: string) => {
        let newTask = {id: v1(), title: titleInput, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        //setTasks([...tasks, {id: v1(), title: titleInput, isDone: false}])
    }
    const changeStatusCheckbox = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(tl => tl.id === taskID ? {...tl, isDone: isDone} : tl)})
        //setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        console.log(tasks)
    }
    const addToDoList = (newTitle: string) => {
        let newToDoList: todolistsType = {id: v1(), title: newTitle, filter: "all"}
        setTodolists([newToDoList, ...todolists])
        setTasks({...tasks, [newToDoList.id]: []})
    }
    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
    }
    const editToDoList = (todoListID: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, title: newTitle} : tl))
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
                        News
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
