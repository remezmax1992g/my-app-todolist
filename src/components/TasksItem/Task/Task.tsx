import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../../../ToDoList";

type TaskPropsType = {
    task: TaskType
    changeStatusCheckBox: (taskID: string, isDone: boolean) => void
    editTask: (taskID: string, newTitle: string) => void
    removeTask: (taskID: string) => void
}

const Task = React.memo(({task, changeStatusCheckBox, editTask, removeTask}: TaskPropsType) => {
        //function
        const changeStatusCheckboxHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            changeStatusCheckBox(task.id, event.currentTarget.checked)
        }, [changeStatusCheckBox, task.id])
        const editTaskHandler = useCallback((title: string) => {
            editTask(task.id, title)
        }, [editTask, task.id])
        const removeTaskHandler = useCallback(() => {
            removeTask(task.id)
        }, [removeTask, task.id])

        return (
            <span>
                <Checkbox checked={task.isDone}
                          onChange={changeStatusCheckboxHandler}/>
                <EditableSpan title={task.title}
                              isDone={task.isDone}
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