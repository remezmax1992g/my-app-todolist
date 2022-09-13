import React, {useState} from 'react'
import {TaskPriority, tasksAPI, TaskStatus} from "../api/tasks-api";

export default {
    title: 'tasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const getTasksHandler = () => {
        tasksAPI.getTask(todolistID)
            .then(response => setState(response.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolistID" value={todolistID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <button onClick={getTasksHandler}>Get Tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const createTaskHandler = () => {
        tasksAPI.createTask(todolistID, title)
            .then(response => setState(response.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolistID" value={todolistID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input type="text" placeholder="newTitle" value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTaskHandler}>Create Task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [taskID, setTaskID] = useState<string>("")
    const deleteTaskHandler = () => {
        tasksAPI.deleteTask(todolistID, taskID)
            .then(response => setState(response.data))
    }

    return <div>
        <div>
            <input type="text" placeholder="todolistID" value={todolistID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <input type="text" placeholder="taskID" value={taskID} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/>
            <button onClick={deleteTaskHandler}>Delete Task</button>
        </div>
        {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [taskID, setTaskID] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const updateTaskHandler = () => {
        tasksAPI.updateTask(todolistID, taskID, {
            title: title,
            description: "No information",
            status: TaskStatus.New,
            priority: TaskPriority.Low,
            startDate: "",
            deadline: ""
        })
            .then(response => setState(response.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolistID" value={todolistID} onChange={(e) => {
            setTodolistID(e.currentTarget.value)
        }}/>
            <input type="text" placeholder="taskID" value={taskID} onChange={(e) => {
                setTaskID(e.currentTarget.value)
            }}/>
            <input type="text" placeholder="newTitle" value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTaskHandler}>Create Task</button>
        </div>
    </div>
}