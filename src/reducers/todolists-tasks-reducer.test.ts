import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistEntityType, todosReducer,
} from "./todolists-reducer";
import {tasksReducer, TasksType} from "./tasks-reducer";
import {TaskPriority, TaskStatus} from "../api/tasks-api";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistEntityType> = [];
    const todolist = {
        id: "todolistID3",
        title: "new todolist",
        filter: "all",
        addedDate: "",
        order: 0
    }
    const action = addTodolistAC({todolist: todolist});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todosReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        "todolistId1":  [
        {id: "1", title: "HTML", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
        {id: "2", title: "CSS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
        {id: "2", title: "JS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0}
    ],
        "todolistId2": [
        {id: "1", title: "Milk", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
        {id: "2", title: "Cheese", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
        {id: "3", title: "Bread", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0}
    ],

    };

    const action = removeTodolistAC({todolistID: "todolistId2"});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('empty task array should be added when we set todolists', () => {
    let startState = [
        {id: "todolistID1", title: 'What to learn', filter: 'all', addedDate: "", order: 0},
        {id: "todolistID2", title: 'What to buy', filter: 'all', addedDate: "", order: 0},
    ]
    const endState = tasksReducer({}, setTodolistsAC({todolists: startState}))
    expect(endState["todolistID1"]).toStrictEqual([])
    expect(endState["todolistID2"]).toStrictEqual([])
});

