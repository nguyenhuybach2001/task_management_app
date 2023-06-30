// redux/taskReducer.js

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "CLEAR_TASK":
      const updatedTasks = [...state.tasks];
      updatedTasks.splice(action.payload, 1);
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};

export default taskReducer;
