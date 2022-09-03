import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {v1} from "uuid";

export default {
    title: "Task Component",
    component: Task
}
const changeTaskStatusCallback = action("Status was changed")
const editTaskCallback = action("Title was edited")
const removeTaskCallback = action("Task was removed")

export const TaskBaseExample = () => {
    return <>
        <Task task={{id: v1(), isDone: false, title: "CSS"}}
                   changeStatusCheckBox={changeTaskStatusCallback}
                   editTask={editTaskCallback}
                   removeTask={removeTaskCallback}/>
        <Task task={{id: v1(), isDone: true, title: "CSS"}}
                   changeStatusCheckBox={changeTaskStatusCallback}
                   editTask={editTaskCallback}
                   removeTask={removeTaskCallback}/>
    </>
}