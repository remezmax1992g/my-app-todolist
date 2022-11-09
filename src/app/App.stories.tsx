import App from "./App";
import {HashRouterDecorator, ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "App Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator, HashRouterDecorator]
} as ComponentMeta<typeof App>
const Template: ComponentStory<typeof App> =()=> <App/>
export const AppStory = Template.bind({})
AppStory.args = {}