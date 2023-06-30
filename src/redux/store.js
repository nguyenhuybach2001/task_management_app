// store/index.js
import { createStore } from "redux";
import taskReducer from "./taskReducer/taskReducer";

const store = createStore(taskReducer);

export default store;
