import React from 'react';
import Task from "./Task/Task";
import {TaskType} from "../../../../api/tasks-api";

type TaskItemTypeProps = {
    //value
    tasks: Array<TaskType>
    todolistID: string
}

const TasksItem = React.memo(({tasks, todolistID}: TaskItemTypeProps) => {
        //value
        const taskListItem = tasks.length
            ? tasks.map((t, index) =>
                <div key={index}><Task task={t}
                         todolistID={todolistID}/></div>
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