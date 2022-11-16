import {TaskType} from "../api/tasks-api";
import {createSlice} from "@reduxjs/toolkit";
import {createTaskTC, deleteTaskTC, fetchTaskTC, updateTaskTC} from "./tasks-action";
import {createTodolistTC, deleteTodolistTC, fetchTodolistsTC} from "./todos-action";
//initialState
const initialStateForTasks: TasksType = {}

const slice = createSlice(({
    name: "tasks",
    initialState: initialStateForTasks,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.todolistID]
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTaskTC.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks
            })
            .addCase(createTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            })
            .addCase(deleteTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload?.taskID)
                state[action.payload.todolistID].splice(index, 1)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
                state[action.payload.todolistID][index] = {...state[action.payload.todolistID][index], ...action.payload.model}
            })
    }
}))
//reducer
export const tasksReducer = slice.reducer

//types for state
export type TasksType = {
    [key: string]: TaskType[]
}