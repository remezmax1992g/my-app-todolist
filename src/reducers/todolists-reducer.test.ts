import {v1} from "uuid";
import {FilteredValuesType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    editTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistID1 = v1()
let todolistID2 = v1()
let startState: Array<TodolistsType>

beforeEach(() => {
        startState = [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    }
)


test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
test("todolist should be added", () => {
    let newTodolistTitle = "New Todolist"
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
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