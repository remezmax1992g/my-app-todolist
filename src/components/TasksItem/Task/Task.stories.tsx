import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {v1} from "uuid";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "Task Component",
    component: Task,
    args:{
        changeStatusCheckBox: action("Status was changed"),
        editTask: action("Title was edited"),
        removeTask: action("Task was removed"),
        task: {id: v1(), isDone: true, title: "CSS"},
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>
export const TaskIsDoneStory = Template.bind({})
TaskIsDoneStory.args = {
}
export const TaskIsNotDoneStory = Template.bind({})
TaskIsNotDoneStory.args = {
    task: {id: v1(), isDone: false, title: "React"},
}
