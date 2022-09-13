import React, {useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'todolistsAPI'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const getTodolistsHandler = () => {
        todolistsAPI.getTodolists()
            .then(response => setState(response.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={getTodolistsHandler}>Get Todolists</button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")
    const createTodolistHandler = () => {
        todolistsAPI.createTodolist(title)
            .then(response => setState(response.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="title" value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolistHandler}>Create Todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const deleteTodolistHandler = () => {
        todolistsAPI.deleteTodolist(todolistID)
            .then(response => setState(response.data))
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text" placeholder="todolistID" value={todolistID} onChange={(e) => {
                setTodolistID(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolistHandler}>Delete Todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const updateTodolistHandler = () => {
        todolistsAPI.updateTodolist(todolistID, title)
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
            <button onClick={updateTodolistHandler}>Update Todolist</button>
        </div>
    </div>
}
