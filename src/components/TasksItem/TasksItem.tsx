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
    changeStatusCheckBox: (todolistID: string, taskID: string, isDone: boolean) => void
    removeTask: (todolistID: string, taskID: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
}

const TasksItem = (props: TaskItemTypeProps) => {
    //function
    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(todolistID, taskID)
    }
    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editTask(props.todolistID, taskID, newTitle)
    }
    //value
    const taskListItem = props.tasks.length ? props.tasks.map((t, index) => {
        const changeStatusCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeStatusCheckBox(props.todolistID, t.id, event.currentTarget.checked)
        }
        return (<div key={index}><Checkbox checked={t.isDone}
                                          onChange={changeStatusCheckbox}/>
            <EditableSpan title={t.title} isDone={t.isDone} onChange={(title) => editTaskHandler(t.id, title)}/>
            <IconButton aria-label="delete" onClick={() => removeTask(props.todolistID, t.id)}>
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