import React, { useReducer, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const IDLE = "IDLE";
const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
const ADD_TODO = "ADD_TODO";
const FETCH_TODO = "FETCH_TODO";

let InitialState = {
  status: IDLE,
  todos: [],
  error: {}
};

const todoReducers = (state, action) => {
  if (!state) {
    return InitialState;
  }
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload)
      };
    case FETCH_TODO:
      return {
        ...state,
        status: PENDING
      };
    case RESOLVED:
      return {
        ...state,
        status: IDLE
      };
    case REJECTED:
      return {
        ...state,
        status: IDLE,
        error: action.error
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(todoReducers, InitialState);
  const launchRequests = () => {
    dispatch({ type: FETCH_TODO });
  };

  const fetchTodos = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(({ data }) => {
        if (data) {
          dispatch({ type: ADD_TODO, payload: data });
          dispatch({ type: RESOLVED });
        }
      })
      .catch(error => {
        dispatch({ type: REJECTED, error });
      });
  };

  useEffect(() => {
    if (state.status === PENDING) {
      fetchTodos();
    }
  }, [state.status, dispatch]);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <br />
      <button onClick={launchRequests}>Fetch tasks</button>
      <hr />
      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {state.todos.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </div>
  );
}
