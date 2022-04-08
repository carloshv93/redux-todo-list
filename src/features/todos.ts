import { combineReducers } from "redux";
import {
  makeCrudReducer,
  makeFetchingReducer,
  makeSetReducer,
  reduceReducers,
  asyncMac,
  mat,
  mac,
} from "./utils";
const asyncTodos = mat("todos");
const [setPending, setFulfilled, setError] = asyncMac(asyncTodos);
const fulfilledReducer = makeSetReducer(["todos/fulfilled"]);
const crudReducer = makeCrudReducer(["todos/add", "todos/complete"]);
export const add = mac("todos/add", "payload");
export const setFilter = mac("filter/set", "payload");
export const setComplete = mac("filter/complete", "payload");
export const filterReducer = makeSetReducer(["filter/set"]);

export const todosReducer = reduceReducers(crudReducer, fulfilledReducer);
export const fetchingReducer = makeFetchingReducer(asyncTodos);

export const reducer = combineReducers({
  data: combineReducers({ todos: todosReducer, status: fetchingReducer }),
  filter: filterReducer,
});

export const fetchThunk = () => async (dispatch) => {
  dispatch(setPending());
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    const todos = data.slice(0, 10);
    dispatch(setFulfilled(todos));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const selectStatus = (state) => state.data.status;
export const selectTodos = ({ data: { todos }, filter }) => {
  if (filter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  if (filter === "incompleted") {
    return todos.filter((todo) => !todo.completed);
  }

  return todos;
};
