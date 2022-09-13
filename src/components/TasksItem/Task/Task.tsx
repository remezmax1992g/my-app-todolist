import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatus, TaskType} from "../../../api/tasks-api";

type TaskPropsType = {
    task: TaskType
    changeStatusCheckBox: (taskID: string, status: TaskStatus) => void
    editTask: (taskID: string, newTitle: string) => void
    removeTask: (taskID: string) => void
}

const Task = React.memo(({task, changeStatusCheckBox, editTask, removeTask}: TaskPropsType) => {
        //function
        const changeStatusCheckboxHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            let status: TaskStatus = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
            changeStatusCheckBox(task.id, status)
        }, [changeStatusCheckBox, task.id])
        const editTaskHandler = useCallback((title: string) => {
            editTask(task.id, title)
        }, [editTask, task.id])
        const removeTaskHandler = useCallback(() => {
            removeTask(task.id)
        }, [removeTask, task.id])

        return (
            <span>
                <Checkbox checked={task.status === TaskStatus.Completed}
                          onChange={changeStatusCheckboxHandler}/>
                <EditableSpan title={task.title}
                              status={task.status}
                              onChangeTitle={editTaskHandler}/>
                <IconButton aria-label="delete"
                            onClick={removeTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </span>
        );
    }
)

export default Task;