import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterTodolistAC, changeStatusTodolistAC,
    editTodolistAC, FilteredValuesType,
    removeTodolistAC, setTodolistsAC, TodolistEntityType,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "./app-reducer";


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
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))
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
    const endState = todolistsReducer(startState, addTodolistAC(newTodolist))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolist.title)
})
test("correct todolist should be edited", () => {

    let newTodolistTitle = "New Todolist"

    const endState = todolistsReducer(startState, editTodolistAC(todolistID2, newTodolistTitle))
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})
test("correct todolist should be filtered", () => {

    let newfilter: FilteredValuesType = "completed"

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistID2, newfilter))
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})
test("correct status should be changed in todolist", () => {

    let newStatus: RequestStatusType = "loading"

    const endState = todolistsReducer(startState, changeStatusTodolistAC(todolistID2, newStatus))
    expect(endState[0].status).toBe("idle")
    expect(endState[1].status).toBe("loading")
})
test("todolists should be set to the state", () => {
    const endState = todolistsReducer([], setTodolistsAC(startState))
    expect(endState.length).toBe(2)
})