import React from 'react';
import Button from "@mui/material/Button";
import {FilteredValuesType} from "../../App";

type FilteredButtonType = {
    todolistID: string
    filter: FilteredValuesType
    changeFilter:(todolistID: string, filter: FilteredValuesType) => void
}

const FilteredButton = (props: FilteredButtonType) => {
    const getChangeFilterHandler = (todolistID: string, filter: FilteredValuesType) => {
        return props.changeFilter(todolistID, filter)
    }
    return (
        <div>
            <Button variant={props.filter==="all" ? "contained" : "text"} color={"inherit"} onClick={() => getChangeFilterHandler(props.todolistID, "all")}>all</Button>
            <Button variant={props.filter==="active" ? "contained" : "text"} color={"success"} onClick={() => getChangeFilterHandler(props.todolistID, "active")}>active</Button>
            <Button variant={props.filter==="completed" ? "contained" : "text"} color={"error"} onClick={() => getChangeFilterHandler(props.todolistID, "completed")}>completed</Button>
        </div>
    );
};

export default FilteredButton;
