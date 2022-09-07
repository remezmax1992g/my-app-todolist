import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "AddItemForm Component",
    component: AddItemForm,
    argType:{
        addItem:{
            description:'callback'
        }
    }
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> =(args)=> <AddItemForm {...args}/>
export const AddItemFormStory = Template.bind({})
AddItemFormStory.args = {
    addItem: action("Button 'Add' was pressed inside the form")
}
