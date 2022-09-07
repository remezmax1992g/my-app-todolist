import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    title: "EditableSpan Component",
    component: EditableSpan,
    args:{
        title: "Started value",
        onChangeTitle: action("Title was changed")
    },
    argsType:{
        onChangeTitle:{
            description:'callback for changing title'
        }
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> =(args)=> <EditableSpan {...args}/>
export const EditableSpanStory = Template.bind({})
EditableSpanStory.args = {}
