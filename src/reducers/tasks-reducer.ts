import {TaskType} from "../api/tasks-api";
import {createSlice} from "@reduxjs/toolkit";
import {changeStatusTaskTC, createTaskTC, deleteTaskTC, fetchTaskTC, updateTaskTC} from "./tasks-action";
import {createTodolistTC, deleteTodolistTC, fetchTodolistsTC} from "./todos-action";
//initialState
const initialStateForTasks: TasksType = {}

const slice = createSlice(({
    name: "tasks",
    initialState: initialStateForTasks,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistID]
        })
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTaskTC.fulfilled, (state, action) => {
                state[action.payload.todolistID] = action.payload.tasks
        })
        builder.addCase(createTaskTC.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload?.taskID)
                state[action.payload.todolistID].splice(index, 1)
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID][index].title = action.payload.title
        })
        builder.addCase(changeStatusTaskTC.fulfilled, (state, action) => {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID)
            state[action.payload.todolistID][index].status = action.payload.status
        })
    }
}))
//reducer
export const tasksReducer = slice.reducer

//types for state
export type TasksType = {
    [key: string]: TaskType[]
}