import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("Button 'Add' was pressed inside the form")

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm label={"Type Task"} addItem={callback}/>
}