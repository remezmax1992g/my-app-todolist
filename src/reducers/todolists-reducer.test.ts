import {v1} from "uuid";
import {
    changeFilterTodolistAC, changeStatusTodolistAC, FilteredValuesType,
    TodolistEntityType, todosReducer,
} from "./todolists-reducer";
import {RequestStatusType} from "./app-reducer";
import {createTodolistTC, deleteTodolistTC, fetchTodolistsTC, updateTodolistTC} from "./todos-action";


let todolistID1 = v1()
let todolistID2 = v1()
let startState: Array<TodolistEntityType>

beforeEach(() => {
        startState = [
            {id: todolistID1, title: 'What to learn', filter: 'all', status: "idle", addedDate: "", order: 0},
            {id: todolistID2, title: 'What to buy', filter: 'all', status: "idle", addedDate: "", order: 0},
        ]
    }
)

test("correct todolist should be removed", () => {
    const endState = todosReducer(startState, deleteTodolistTC.fulfilled({todolistID: todolistID1}, "requestID", {todolistID: todolistID1}))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
test("todolist should be added", () => {
    let newTodolist = {
        id: "todolistID3",
        title: "new todolist",
        filter: "all",
        addedDate: "",
        order: 0
    }
    const endState = todosReducer(startState, createTodolistTC.fulfilled({todolist: newTodolist}, "requestID",{newTitle: "new todolist"}))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist.title)
})
test("correct todolist should be edited", () => {

    let newTodolistTitle = "New Todolist"

    const endState = todosReducer(startState, updateTodolistTC.fulfilled({todolistID: todolistID2, title: newTodolistTitle}, "requestID", {todolistID: todolistID2, title: newTodolistTitle}))
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})
test("correct todolist should be filtered", () => {

    let newfilter: FilteredValuesType = "completed"

    const endState = todosReducer(startState, changeFilterTodolistAC({todolistID: todolistID2, filter: newfilter}))
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})
test("correct status should be changed in todolist", () => {

    let newStatus: RequestStatusType = "loading"

    const endState = todosReducer(startState, changeStatusTodolistAC({todolistID: todolistID2, status: newStatus}))
    expect(endState[0].status).toBe("idle")
    expect(endState[1].status).toBe("loading")
})
test("todolists should be set to the state", () => {
    const endState = todosReducer([], fetchTodolistsTC.fulfilled({todolists: startState}, "requestID", undefined))
    expect(endState.length).toBe(2)
})