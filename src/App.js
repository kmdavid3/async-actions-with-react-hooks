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
  todos: [
    {
      userId: 251,
      id: 129,
      title: "nesciunt itaque commodi tempore",
      completed: true
    }
  ]
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
        status: IDLE
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(todoReducers, InitialState);
  const fetchTasks = () => {
    dispatch({ type: FETCH_TODO });
    console.log("fetching tasks");
    setTimeout(() => {
      dispatch({ type: RESOLVED });
    });
  };

  const fetchTodos = async () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        return response;
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: REJECTED });
      });
    // console.log("response : ", response.data);
    // return response;
  };

  useEffect(() => {
    if (state.status === PENDING) {
      try {
        const response = fetchTodos();
        if (response.data) {
          console.log("voila la data");
        }
        dispatch({ type: RESOLVED });
      } catch (error) {
        console.log("an error occur");
      }
      // const payload = fetchTodos();
      // console.log("payload : ", payload);
      // dispatch({ type: ADD_TODO, payload });
    }
  }, [state.status]);
  console.log(state);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <br />
      <button onClick={fetchTasks}>Fetch tasks</button>
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
                <td>{item.id}</td>
                <td>{item.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
