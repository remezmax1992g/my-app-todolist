import React, {useCallback} from 'react';
import Button from "@mui/material/Button";
import {FilteredValuesType} from "../../App";

type FilteredButtonType = {
    todolistID: string
    filter: FilteredValuesType
    changeFilter: (todolistID: string, filter: FilteredValuesType) => void
}

const FilteredButton = React.memo(({todolistID, filter, changeFilter}: FilteredButtonType) => {
        const getChangeFilterHandler = useCallback((todolistID: string, filter: FilteredValuesType) => {
            return changeFilter(todolistID, filter)
        }, [changeFilter])
        return (
            <div>
                <Button variant={filter === "all" ? "contained" : "text"} color={"inherit"}
                        onClick={() => getChangeFilterHandler(todolistID, "all")}>all</Button>
                <Button variant={filter === "active" ? "contained" : "text"} color={"success"}
                        onClick={() => getChangeFilterHandler(todolistID, "active")}>active</Button>
                <Button variant={filter === "completed" ? "contained" : "text"} color={"error"}
                        onClick={() => getChangeFilterHandler(todolistID, "completed")}>completed</Button>
            </div>
        );
    }
)

export default FilteredButton;
