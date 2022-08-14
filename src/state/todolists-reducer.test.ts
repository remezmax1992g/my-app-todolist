import {v1} from "uuid";
import {FilteredValuesType, TodolistsType} from "../App";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    editTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})
test("todolist should be added", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, addTodolistAC( newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})
test("correct todolist should be edited", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newTodolistTitle = "New Todolist"

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, editTodolistAC(todolistID2, newTodolistTitle))
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})
test("correct todolist should be filtered", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let newfilter: FilteredValuesType = "completed"

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]

    const endState = todolistsReducer(startState, changeFilterTodolistAC(todolistID2, newfilter))
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("completed")
})