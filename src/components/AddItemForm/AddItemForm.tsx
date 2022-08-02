import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type AddItemFormTypeProps = {
    label: string
    //function
    addTask: (titleInput: string) => void
}

const AddItemForm = (props: AddItemFormTypeProps) => {
    //state
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    //function
    const onClickAddTask = () => {
        let newTitle = title.trim()
        if (newTitle) {
            props.addTask(newTitle)
            error && setError(false)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        let currentTitle = event.currentTarget.value
        setTitle(currentTitle)
    }
    const onKeyboardAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && event.ctrlKey) {
           onClickAddTask()
        }
    }
    //interface
    return (
        <div>
            <TextField className={error ? "inputError" : "inputName"}
                       variant={"outlined"}
                       value={title}
                       label={props.label}
                       onClick={onClickAddTask}
                       onChange={onChangeInputTitle}
                       onKeyDown={onKeyboardAddTask}
                       error={!!error}
                       helperText={error && "Title is required!"}
                       />
            <IconButton onClick={onClickAddTask} color={"primary"}>
                <AddCircle/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;