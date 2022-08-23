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

const TasksItem = React.memo((props: TaskItemTypeProps) => {
        //value
        const taskListItem = props.tasks.length
            ? props.tasks.map((t, index) =>
                <div key={index}><Task task={t}
                         editTask={props.editTask}
                         removeTask={props.removeTask}
                         changeStatusCheckBox={props.changeStatusCheckBox}/></div>
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