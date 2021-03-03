import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";
import TodoItem from "./TodoItem";

const TodoListStyle = styled.div`
  height: 300px;
  text-align: start;
  padding: 5px 28px;
  overflow-y: scroll;
`;

const TodoList = () => {
  const state = useTodoState();
  return (
    <TodoListStyle>
      {state.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            checked={todo.checked}
          />
        );
      })}
    </TodoListStyle>
  );
};

export default TodoList;
