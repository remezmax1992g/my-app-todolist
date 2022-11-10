import {
    changeStatusTaskTC,
    createTaskTC, deleteTaskTC,
    fetchTaskTC,
    tasksReducer,
    TasksType, updateTaskTC
} from "./tasks-reducer";
import {TaskPriority, TaskStatus} from "../api/tasks-api";

let startState: TasksType
beforeEach(() => {
    startState = {
        "todolistID1": [
            {id: "1", title: "CSS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "todolistID1", order: 0},
            {id: "2", title: "JS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "todolistID1", order: 0},
            {id: "3", title: "React", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "todolistID1", order: 0}
        ],
        "todolistID2": [
            {id: "1", title: "bread", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "todolistID2", order: 0},
            {id: "2", title: "milk",  description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "todolistID2", order: 0},
            {id: "3", title: "tea",  description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "todolistID2", order: 0}
        ]
    }
})

test("correct task should be deleted from correct array", () =>{
    const endState = tasksReducer(startState, deleteTaskTC.fulfilled({todolistID: "todolistID2", taskID: "2"}, "requestID", {todolistID: "todolistID2", taskID: "2"}))
    expect(endState["todolistID1"].length).toBe(3)
    expect(endState["todolistID2"].length).toBe(2)
    expect(endState["todolistID2"].every(t => t.id !== "2")).toBeTruthy()
})
test('correct task should be added to correct array', () => {
    const task = {id: "1",
        title: "juice",
        description: "No information",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistID2",
        order: 0}
    const endState = tasksReducer(startState, createTaskTC.fulfilled({task},"requestID", {todolistID: "todolistID2", newTitle: "juice"}))
    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(4);
    expect(endState["todolistID2"][0].id).toBeDefined();
    expect(endState["todolistID2"][0].title).toBe("juice");
    expect(endState["todolistID2"][0].status).toBe(TaskStatus.New);
})
test('status of specified task should be changed', () => {

    const endState = tasksReducer(startState, changeStatusTaskTC.fulfilled({todolistID: "todolistID2", taskID: "2", status: TaskStatus.Completed}, "requestID", {todolistID: "todolistID2", taskID: "2", status: TaskStatus.Completed}))
    expect(endState["todolistID2"][1].status).toBe(TaskStatus.Completed);
    expect(endState["todolistID1"][1].status).toBe(TaskStatus.New);
});
test('title of specified task should be changed', () => {

    const endState = tasksReducer(startState, updateTaskTC.fulfilled({todolistID: "todolistID2", taskID: "2", title: "Milkyway"}, "requestID", {todolistID: "todolistID2", taskID: "2", title: "Milkyway"}))
    expect(endState["todolistID2"][1].title).toBe("Milkyway");
    expect(endState["todolistID1"][1].title).toBe("JS");
});
test('tasks should be set to the state', () => {
    const action = fetchTaskTC.fulfilled({todolistID: "todolistID1", tasks: startState["todolistID1"]}, "requestId", "todolistID1")
    const endState = tasksReducer({["todolistID1"]:[],["todolistID2"]:[]}, action)
    expect(endState["todolistID1"].length).toBe(3);
    expect(endState["todolistID2"].length).toBe(0);

});








