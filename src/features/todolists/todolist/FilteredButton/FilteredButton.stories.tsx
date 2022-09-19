import {action} from "@storybook/addon-actions";
import FilteredButton from "./FilteredButton";
import {ComponentStory} from "@storybook/react";

export default {
    title: "FilteredButton Component",
    component: FilteredButton,
    args:{
        todolistID: "1",
        filter: "all",
        changeFilter: action("Filter was changed")
    }
}
const Template: ComponentStory<typeof FilteredButton> =(args)=> <FilteredButton {...args}/>
export const FilteredButtonStory = Template.bind({})
FilteredButtonStory.args = {}