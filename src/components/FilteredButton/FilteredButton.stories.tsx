import {action} from "@storybook/addon-actions";
import FilteredButton from "./FilteredButton";

export default {
    title: "FilteredButton Component",
    component: FilteredButton
}
const onChangeFilterCallback = action("Filter was changed")

export const FilteredButtonBaseExample = () => {
    return <>
        <FilteredButton todolistID={"1"} filter={"all"} changeFilter={onChangeFilterCallback}/>
    </>
}