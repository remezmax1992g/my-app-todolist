import {TasksType} from "../App";
import {addTaskAC, changeStatusCheckboxAC, editTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

let startState: TasksType
beforeEach(() => {
    startState = {
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
})

test("correct task should be deleted from correct array", () =>{
    const endState = tasksReducer(startState, removeTaskAC("todolistID2", "2"))
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID2"].length).toBe(2)
    expect(endState["todolistID2"].every(t => t.id !== "2")).toBeTruthy()
})

test('correct task should be added to correct array', () => {

    const endState = tasksReducer(startState, addTaskAC("todolistID2", "juice"))
    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe("juice");
    expect(endState["todolistID2"][0].isDone).toBe(false);
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeStatusCheckboxAC("todolistID2", "2", false))
    expect(endState["todolistID2"][1].isDone).toBeFalsy();
    expect(endState["todolistID1"][1].isDone).toBeTruthy();
});
test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, editTaskAC("todolistID2", "2", "Milkyway"))
    expect(endState["todolistID2"][1].title).toBe("Milkyway");
    expect(endState["todolistID1"][1].title).toBe("JS");
});







