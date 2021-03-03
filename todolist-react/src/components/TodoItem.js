import React from "react";
import styled, { css } from "styled-components";
import { FaRegCircle, FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { useTodoDispatch } from "../TodoContext";

const TodoItemStyle = styled.div`
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
  transition: all 300ms ease-in;
  cursor: pointer;

  div {
    display: flex;
    vertical-align: middle;
  }
  transition: all 300ms ease-in;
  &:hover {
    background: whitesmoke;
  }
`;

const CheckBtn = styled.div`
  cursor: pointer;
  font-size: 20px;
  width: 20px;
  height: 20px;
  margin: 0 10px 3px;
  color: #616161;
  ${(props) =>
    props.checked &&
    css`
      color: #495057;
      opacity: 0.4;
    `}
`;

const Text = styled.div`
  font-size: 18px;
  margin-left: 5px;
  line-height: 0.9;
  text-align: start;
  ${(props) =>
    props.checked &&
    css`
      color: #495057;
      opacity: 0.4;
    `}
`;

const Delete = styled.div`
  cursor: pointer;
  padding: 10px;
  color: thistle;
  font-size: 18px;
  transition: all 300ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

const TodoItem = ({ id, checked, text }) => {
  const dispatch = useTodoDispatch();
  const toggleBtn = () => dispatch({ type: "TOGGLE", id });
  const removeBtn = () => dispatch({ type: "REMOVE", id });

  return (
    <TodoItemStyle>
      <div>
        <CheckBtn checked={checked} onClick={toggleBtn}>
          {checked ? <FaRegCheckCircle /> : <FaRegCircle />}
        </CheckBtn>
        <Text checked={checked}>{text}</Text>
      </div>
      <Delete onClick={removeBtn}>
        <FaTimes />
      </Delete>
    </TodoItemStyle>
  );
};

export default TodoItem;
