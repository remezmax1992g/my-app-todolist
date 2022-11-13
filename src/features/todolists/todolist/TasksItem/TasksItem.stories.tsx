import {action} from "@storybook/addon-actions";
import TasksItem from "./TasksItem";
import {v1} from "uuid";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskPriority, TaskStatus} from "../../../../api/tasks-api";
import {HashRouterDecorator, ReduxStoreProviderDecorator} from "../../../../stories/ReduxStoreProviderDecorator";

export default {
    title: "TaskItem Component",
    component: TasksItem,
    args:{
        changeStatusCheckBox: action("Status was changed"),
        editTask: action("Title was edited"),
        removeTask: action("Task was removed"),
        tasks: [{id: v1(), title: "CSS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
            {id: v1(), title: "HTML", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
            {id: v1(), title: "JS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
         ],
    },
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
} as ComponentMeta<typeof TasksItem>;

const Template: ComponentStory<typeof TasksItem> = (args) => <TasksItem {...args}/>
export const TasksItemStory = Template.bind({})
TasksItemStory.args = {
}
