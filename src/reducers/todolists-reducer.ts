import {TodolistType} from "../api/todolists-api";
import {RequestStatusType} from "./app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTodolistTC, deleteTodolistTC, fetchTodolistsTC, updateTodolistTC} from "./todos-action";

export const slice = createSlice({
    name: "todos",
    initialState: [] as TodolistEntityType[],
    reducers: {
        changeFilterTodolistAC(state, action: PayloadAction<{ todolistID: string, filter: FilteredValuesType }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].filter = action.payload.filter
        },
        changeStatusTodolistAC(state, action: PayloadAction<{ todolistID: string, status: RequestStatusType }>) {
            const index = state.findIndex(td => td.id === action.payload.todolistID)
            state[index].status = action.payload.status
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: "all", status: "idle"}))
            })
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', status: "idle"})
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(td => td.id === action.payload.todolistID)
                state.splice(index, 1)
            })
            .addCase(updateTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(td => td.id === action.payload.todolistID)
                state[index].title = action.payload.title
            })
    }
})
//reducer
export const todosReducer = slice.reducer
//actionCreators
export const {
    changeFilterTodolistAC,
    changeStatusTodolistAC
} = slice.actions
//thunkCreators


//type for Action
export type ActionTodolistType =
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof changeStatusTodolistAC>
//types for state
export type TodolistEntityType = TodolistType & {
    //value
    filter: FilteredValuesType
    status: RequestStatusType
}
export type FilteredValuesType = "all" | "active" | "completed";