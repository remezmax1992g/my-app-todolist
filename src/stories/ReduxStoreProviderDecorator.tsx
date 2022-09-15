import {Provider} from "react-redux";
import React from 'react'
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../reducers/tasks-reducer";
import {todolistsReducer} from "../reducers/todolists-reducer";

import thunkMiddleWare from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

// const initialGlobalState = {
//     todolists: [
//         {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
//         {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
//     ] ,
//     tasks: {
//         ["todolistId1"]: [
//             {id: v1(), title: "HTML", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
//             {id: v1(), title: "CSS", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0}
//         ],
//         ["todolistId2"]: [
//             {id: v1(), title: "Milk", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0},
//             {id: v1(), title: "Cheese", description: "No information", status: TaskStatus.New, priority: TaskPriority.Low, startDate: "", deadline: "", todoListId: "td1", order: 0}
//         ]
//     }
// };

export const storyBookStore = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
        return <Provider store={storyBookStore}>{storyFn()}</Provider>
}