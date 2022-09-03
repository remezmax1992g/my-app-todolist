import {action} from "@storybook/addon-actions";
import EditableSpan from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}
const onChangeTitleCallback = action("Title was changed")

export const EditableSpanBaseExample = () => {
    return <>
        <EditableSpan title={"Start value"}
                      onChangeTitle={onChangeTitleCallback}/>
    </>
}