import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditablePropsType = {
    //value
    title: string
    isDone?: boolean
    //function
    onChange: (newTitle: string) => void
}

const EditableSpan = (props: EditablePropsType) => {
    //state
    const [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>(() => {
        return ""})
    //function
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
  const addTask = () => {
      setEditMode(!editMode)
        if(newTitle !== ""){
            props.onChange(newTitle)
        }
    }
    const editHandler = () => {
        setEditMode(!editMode)
        setNewTitle(props.title)
    }
    //interface
    return (
        editMode
        ? <TextField value={newTitle} variant={"standard"} onChange={onChangeHandler} onBlur={addTask} autoFocus/>
        :<span className={props.isDone ? "isDone" : "isActive"} onDoubleClick={editHandler}>{props.title}</span>
    );
};

export default EditableSpan;