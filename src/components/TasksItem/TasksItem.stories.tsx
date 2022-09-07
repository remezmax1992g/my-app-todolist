import {action} from "@storybook/addon-actions";
import TasksItem from "./TasksItem";
import {v1} from "uuid";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "TaskItem Component",
    component: TasksItem,
    args:{
        changeStatusCheckBox: action("Status was changed"),
        editTask: action("Title was edited"),
        removeTask: action("Task was removed"),
        tasks: [{id: v1(), isDone: true, title: "CSS"},
            {id: v1(), isDone: false, title: "Storybook"},
            {id: v1(), isDone: true, title: "JS"},],
    }
} as ComponentMeta<typeof TasksItem>;

const Template: ComponentStory<typeof TasksItem> = (args) => <TasksItem {...args}/>
export const TasksItemStory = Template.bind({})
TasksItemStory.args = {
}
