import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setComplete,
  add,
  setFilter,
  fetchThunk,
  selectStatus,
  selectTodos,
} from "./features/todos";

const TodoItem = ({ title, completed, id }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setComplete(id));
  };
  return (
    <li
      style={{ textDecoration: completed ? "line-through" : "none" }}
      onClick={handleOnClick}
    >
      {title}
    </li>
  );
};
const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const todos = useSelector(selectTodos);
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      const id = Math.random().toString(36);
      const todo = { title: value, completed: false, id };
      dispatch(add(todo));
      setValue("");
    }
  };
  if (status.loading === "pending") {
    return <p>Loading...</p>;
  }
  if (status.loading === "rejected") {
    return <p>Error:{status.error}</p>;
  }
  return (
    <div>
      <form onSubmit={(event) => submit(event)}>
        <input value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
      <button onClick={(e) => dispatch(setFilter("all"))}>Show all</button>
      <button onClick={(e) => dispatch(setFilter("completed"))}>
        Complete
      </button>
      <button onClick={(e) => dispatch(setFilter("incompleted"))}>
        Incomplete
      </button>
      <button onClick={() => dispatch(fetchThunk())}>fetch</button>
      <ul>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
