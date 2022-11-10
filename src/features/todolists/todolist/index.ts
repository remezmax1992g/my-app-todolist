import * as tasksAction from './../../../reducers/tasks-action'
import * as todosAsyncAction from './../../../reducers/todos-action'
import {slice} from '../../../reducers/todolists-reducer'

const todosAction = {
    ...todosAsyncAction,
    ...slice.actions
}

export  {
    tasksAction,
    todosAction
}