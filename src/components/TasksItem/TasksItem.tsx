import React, {ChangeEvent} from 'react';
import {TaskType} from "../../ToDoList";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

type TaskItemTypeProps = {
    //value
    todolistID: string
    tasks: Array<TaskType>
    //function
    changeStatusCheckBox: (taskID: string, isDone: boolean) => void
    removeTask: (taskID: string) => void
    editTask: (taskID: string, newTitle: string) => void
}

const TasksItem = (props: TaskItemTypeProps) => {

    //value
    const taskListItem = props.tasks.length ? props.tasks.map((t, index) => {
        const changeStatusCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusCheckBox(t.id, event.currentTarget.checked)
        }
        return (<div key={index}><Checkbox checked={t.isDone}
                                          onChange={changeStatusCheckbox}/>
            <EditableSpan title={t.title} isDone={t.isDone} onChange={(title) => props.editTask(t.id, title)}/>
            <IconButton aria-label="delete" onClick={() => props.removeTask(t.id)}>
                <DeleteIcon/>
            </IconButton>
        </div>)
    }) : <span>Your task's list is empty</span>

    return (
        <span>
            <div className={"taskListItem"}>{taskListItem}</div>
        </span>
    );
};

export default TasksItem;