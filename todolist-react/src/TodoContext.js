import React, { createContext, useContext, useReducer, useRef } from "react";

const initialTodo = [
  {
    id: 1,
    text: "밥 먹기",
    checked: false,
  },
  {
    id: 2,
    text: "숨 쉬기",
    checked: true,
  },
  {
    id: 3,
    text: "리액트 공부하기",
    checked: true,
  },
];
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
export const TodoNextIdContext = createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialTodo);
  const nextId = useRef(4);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export function useTodoState() {
  return useContext(TodoStateContext);
}

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodoNexId() {
  return useContext(TodoNextIdContext);
}

export default TodoProvider;
