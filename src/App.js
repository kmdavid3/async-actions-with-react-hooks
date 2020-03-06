import React, { useReducer } from "react";
import "./styles.css";

const IDLE = 'IDLE';
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';
const ADD_TODO = 'ADD_TODO';
const FETCH_TODO = 'FETCH_TODO';


let InitialState = {
  status: IDLE,
  todos: [{
    userId: 250,
    id: 129,
    title: "nesciunt itaque commodi tempore",
    completed: true
  }],
};

const todoReducers = (state, action) => {
  if (!state) {
    return InitialState;
  }
  switch(action.type){
    case ADD_TODO: 
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      };
    case FETCH_TODO:
      return {
        ...state,
        status: PENDING,
      };
    case RESOLVED: 
      return {
        ...state,
        status: IDLE,
      }
    case REJECTED:
      return {
        ...state,
        status: IDLE,
      }
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(todoReducers, InitialState);
  const fetchTasks = () => {
    console.log('fetching tasks');
  }
  console.log(state);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
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
          {
            state.todos.map((item,index) => {
              return <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}
