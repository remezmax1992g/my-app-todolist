import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditablePropsType = {
    //value
    title: string,
    isDone?: boolean,
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: EditablePropsType) => {
    //state
    const [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>(props.title)
    //function
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if(newTitle !== ""){
            props.onChange(newTitle)
        }
    }
    const editHandler = () => {
        setEditMode(!editMode)
        addTask()
    }
    //interface
    return (
        editMode
        ? <TextField value={newTitle} variant={"standard"} onChange={onChangeHandler} onBlur={editHandler} autoFocus/>
        :<span className={props.isDone ? "isDone" : "isActive"} onDoubleClick={editHandler}>{props.title}</span>
    );
};

export default EditableSpan;