import React from 'react';
import {TaskType} from "../../ToDoList";
import Task from "./Task/Task";

type TaskItemTypeProps = {
    //value
    tasks: Array<TaskType>
    //function
    changeStatusCheckBox: (taskID: string, isDone: boolean) => void
    removeTask: (taskID: string) => void
    editTask: (taskID: string, newTitle: string) => void
}

const TasksItem = React.memo(({tasks, changeStatusCheckBox, removeTask, editTask}: TaskItemTypeProps) => {
        //value
        const taskListItem = tasks.length
            ? tasks.map((t, index) =>
                <div key={index}><Task task={t}
                         editTask={editTask}
                         removeTask={removeTask}
                         changeStatusCheckBox={changeStatusCheckBox}/></div>
            )
            : <span>Your task's list is empty</span>
        return (
            <span>
            <div className={"taskListItem"}>{taskListItem}</div>
        </span>
        );
    }
)

export default TasksItem;