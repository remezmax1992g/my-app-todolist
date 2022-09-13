import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistsAPI.getTodolists()
           .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("Wish List")
            .then(response => setState(response.data.item))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTodolist("aa87584a-659d-42af-bd16-edf1216281ab")
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolist("20e6c714-faac-4835-81f5-26cb1227ee00","Refactoring")
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
