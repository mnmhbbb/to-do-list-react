import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoTable from "./components/TodoTable";
import TodoProvider from "./TodoContext";

const GlobalStyle = createGlobalStyle`
  body{
    background: #e5e5e5;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTable>
        <TodoHeader />
        <TodoList />
        <TodoInput />
      </TodoTable>
    </TodoProvider>
  );
}

export default App;
