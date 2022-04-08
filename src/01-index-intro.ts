import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";

const store = createStore((state = 0, action) => {
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
});

store.dispatch({ type: "increment" });
console.log(store.getState());
store.dispatch({ type: "increment" });
console.log(store.getState());
store.dispatch({ type: "decrement" });
console.log(store.getState());
store.dispatch({ type: "set", payload: 10 });
console.log(store.getState());
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
