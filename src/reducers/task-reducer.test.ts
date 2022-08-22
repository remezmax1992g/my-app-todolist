import {TasksType} from "../App";
import {addTaskAC, changeStatusCheckboxAC, editTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test("correct task should be deleted from correct array", () =>{
    const startState: TasksType ={
        "todolistID1": [
            {id: "1", title: "CSS", isDone:false},
            {id: "2", title: "JS", isDone:true},
            {id: "3", title: "React", isDone:false}
        ],
        "todolistID2": [
            {id: "1", title: "bread", isDone:false},
            {id: "2", title: "milk", isDone:true},
            {id: "3", title: "tea", isDone:false}
        ]
    }
    const endState = tasksReducer(startState, removeTaskAC("todolistID2", "2"))
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID2"].length).toBe(2)
    expect(endState["todolistID2"].every(t => t.id !== "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const endState = tasksReducer(startState, addTaskAC("todolistId2", "juice"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const endState = tasksReducer(startState, changeStatusCheckboxAC("todolistId2", "2", false))

    expect(endState["todolistId2"][1].isDone).toBeFalsy();
    expect(endState["todolistId1"][1].isDone).toBeTruthy();
});
test('title of specified task should be changed', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const endState = tasksReducer(startState, editTaskAC("todolistId2", "2", "Milkyway"))

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});
test('new array should be added when new todolist is added', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const endState = tasksReducer(startState,addTodolistAC("new todolist"))


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});






