import { useReducer } from "react";

const initialState = {
  showText: false,
  changeColor: false,
};

const HIDE_TEXT = "HIDE_TEXT";
const SHOW_TEXT = "SHOW_TEXT";

function reducer(state, action) {
  switch (action.type) {
    case HIDE_TEXT:
      return {
        ...state,
        showText: false,
      };
    case SHOW_TEXT:
      return {
        ...state,
        showText: true,
      };

    default:
      return state;
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  return (
    <div>
      {state?.showText ? <h3>how to use useReducer</h3> : null}
      <button onClick={() => dispatch({ type: HIDE_TEXT })}>Hide text</button>
      <button onClick={() => dispatch({ type: SHOW_TEXT })}>Show text</button>
      <button>Change text styles</button>
    </div>
  );
}
