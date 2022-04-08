import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const reducer = (state = 0, action) => {
  switch (action.type) {
    case "increment": {
      return state + 1;
    }
    case "decrement": {
      return state - 1;
    }
    case "set": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
function App() {
  const [counter, setCounter] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const handleSet = () => {
    dispatch({ type: "set", payload: counter });
    setCounter("");
  };
  return (
    <div>
      <p>Counter: {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={handleSet}>Set</button>
      <input
        value={counter}
        onChange={(e) => setCounter(e.target.value)}
      ></input>
    </div>
  );
}

export default App;
