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

const Task = React.memo((props: TaskPropsType) => {
        //function
        const changeStatusCheckboxHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusCheckBox(props.task.id, event.currentTarget.checked)
        }, [props])
        const editTaskHandler = useCallback((title: string) => {
            props.editTask(props.task.id, title)
        }, [props])
        const removeTaskHandler = useCallback(() => {
            props.removeTask(props.task.id)
        }, [props])

        return (
            <span>
                <Checkbox checked={props.task.isDone}
                          onChange={changeStatusCheckboxHandler}/>
                <EditableSpan title={props.task.title}
                              isDone={props.task.isDone}
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