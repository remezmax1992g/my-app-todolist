import {action} from "@storybook/addon-actions";
import TasksItem from "./TasksItem";
import {v1} from "uuid";

export default {
    title: "TaskItem Component",
    component: TasksItem
}
const changeTaskStatusCallback = action("Status was changed")
const editTaskCallback = action("Title was edited")
const removeTaskCallback = action("Task was removed")

export const TaskItemBaseExample = () => {
    return <>
        <TasksItem tasks={[{id: v1(), isDone: false, title: "HTML"},
            {id: v1(), isDone: false, title: "CSS"},
            {id: v1(), isDone: false, title: "JS"}]}
                   changeStatusCheckBox={changeTaskStatusCallback}
                   removeTask={removeTaskCallback}
                   editTask={editTaskCallback}/>
    </>
}