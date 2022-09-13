import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const setting ={
    withCredentials: true,
    headers:{
        "API-KEY": "8a3ca6c1-dfb0-48cf-8608-08d82687d761"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", setting)
           .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: "New Todolist"}, setting)
            .then(response => setState(response.data.item))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/e2b9f3fe-9ed6-47c4-b338-61ea83e23cec",  setting)
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/6e14c7b8-17d8-4004-b671-17f84ce633bb", {title: "Maxim"}, setting)
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
