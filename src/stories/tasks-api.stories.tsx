import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'tasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.getTask("e4b89c85-0607-497d-839d-fcd36e5182da")
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.createTask("e4b89c85-0607-497d-839d-fcd36e5182da", "New Task")
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.deleteTask("e4b89c85-0607-497d-839d-fcd36e5182da", "95aa7654-1e5d-4a12-8051-06c7e0782f8f")
            .then(response => setState(response))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        tasksAPI.updateTask("e4b89c85-0607-497d-839d-fcd36e5182da","aeddf36a-f190-4f0e-81d5-cf549abf98f2", "Update Task")
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}