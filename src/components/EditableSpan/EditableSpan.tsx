import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@mui/material";

type EditablePropsType = {
    //value
    title: string
    isDone?: boolean
    //function
    onChangeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo(({title, isDone, onChangeTitle}: EditablePropsType) => {
    //state
    const [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState<string>("")
    //function
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }
    const addNewTitle = () => {
        setEditMode(!editMode)
        if (newTitle !== "") {
            onChangeTitle(newTitle)
        }
    }
    const editHandler = useCallback(() => {
        setEditMode(!editMode)
        setNewTitle(title)
    }, [editMode, title])
    //interface
    return (
        editMode
            ?
            <TextField value={newTitle} variant={"standard"} onChange={onChangeHandler} onBlur={addNewTitle} autoFocus/>
            : <span className={isDone ? "isDone" : "isActive"} onDoubleClick={editHandler}>{title}</span>
    );
});

export default EditableSpan;