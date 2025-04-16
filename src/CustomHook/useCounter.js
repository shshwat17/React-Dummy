import { useState, useReducer } from "react";

const reducer = (state = { count: 0 }, action) => {
  switch (action?.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };
    case "decrement":
      return {
        ...state,
        count: state.count === 0 ? 0 : state.count - 1,
      };
  }
};

const useCounter = () => {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const increment = () => {
    // setCount(count + 1);
    dispatch({
      type: "increment",
    });
  };
  const decrement = () => {
    // setCount(count === 0 ? 0 : count - 1);
    dispatch({
      type: "decrement",
    });
  };
  return { count: state?.count, increment, decrement };
};

export default useCounter;
