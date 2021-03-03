import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowUp } from "react-icons/fa";
import { useTodoDispatch, useTodoNexId } from "../TodoContext";

const TodoInputStyle = styled.form`
  text-align: center;
  display: flex;
  flex-direction: column;
  border: none;
  .divider {
    border: 0.1px solid #e5e5e5;
    width: 90%;
    margin: 3px auto;
  }
`;

const InputBtn = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 25px 8px 30px;
  input {
    border: none;
    outline: none;
    text-align: start;
    font-size: 16px;
    width: 80%;
  }
  input:focus {
    border: none;
    outline: none;
  }
  button {
    border: none;
    outline: none;
    background: thistle;
    border-radius: 50%;
    font-size: 18px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: all 300ms ease-in;
    &:hover {
      transform: scale(1.1);
    }
    button:focus {
      border: none;
      outline: none;
    }
    button:active {
      border: none;
      outline: none;
    }
  }
`;

const TodoInput = () => {
  const [value, setValue] = useState("");
  const dispatch = useTodoDispatch();
  const nexdId = useTodoNexId();

  const onChange = (e) => setValue(e.target.value);

  const addItem = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD",
      todo: {
        id: nexdId.current,
        text: value,
        checked: false,
      },
    });
    setValue("");
    nexdId.current += 1;
  };

  return (
    <TodoInputStyle>
      <div className="divider"></div>
      <InputBtn>
        <input
          placeholder="오늘 할 일을 입력하세요!"
          value={value}
          onChange={onChange}
          required
        />
        <button onClick={addItem}>
          <FaArrowUp />
        </button>
      </InputBtn>
    </TodoInputStyle>
  );
};

export default TodoInput;
