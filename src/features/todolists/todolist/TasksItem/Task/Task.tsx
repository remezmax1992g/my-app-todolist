import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../../../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatus, TaskType} from "../../../../../api/tasks-api";
import {useActions} from "../../../../../utilits/redux-utilits";
import {tasksAction} from "../../../index";

type TaskPropsType = {
    task: TaskType
    todolistID: string
}

const Task = React.memo(({task, todolistID}: TaskPropsType) => {
        const {deleteTaskTC, updateTaskTC, changeStatusTaskTC} = useActions(tasksAction)
        //function
        const changeStatusCheckboxHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
            let status: TaskStatus = event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
            changeStatusTaskTC({todolistID, taskID: task.id, status})
        }, [changeStatusTaskTC, task.id, todolistID])
        const editTaskHandler = useCallback((title: string) => {
            updateTaskTC({todolistID, taskID: task.id, title})
        }, [updateTaskTC, task.id, todolistID])
        const removeTaskHandler = useCallback(() => {
            deleteTaskTC({todolistID, taskID: task.id})
        }, [deleteTaskTC, task.id, todolistID])

        return (
            <span style={{position: "relative"}}>
                <Checkbox checked={task.status === TaskStatus.Completed}
                          onChange={changeStatusCheckboxHandler}/>
                <EditableSpan title={task.title}
                              status={task.status}
                              onChangeTitle={editTaskHandler}/>
                <IconButton aria-label="delete"
                            onClick={removeTaskHandler}
                            style={{position: "absolute", left: "250px", top:"-10px"}}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </span>
        );
    }
)

export default Task;