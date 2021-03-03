import React from "react";
import styled from "styled-components";
import Clock from "react-live-clock";
import { useTodoState } from "../TodoContext";

const TodoHeaderStyle = styled.div`
  margin-bottom: 8px;
  heigth: 90px;

  p {
    text-align: center;
    margin-bottom: 5px;
    font-size: 15px;
  }
  h1 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
  }
  h4 {
    padding-left: 30px;
  }
  div {
    border: 0.1px solid #e5e5e5;
    width: 90%;
    margin: 3px auto;
  }
`;

const TodoHeader = () => {
  const date = new Date();
  const years = date.getFullYear();
  const months = date.getMonth();
  const dates = date.getDate();
  const day = date.getDay();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = days[day];

  const state = useTodoState();
  // const state = useContext(TodoStateContext);
  const unChecked = state.filter((v) => !v.checked);

  return (
    <TodoHeaderStyle>
      <p>
        <Clock format={"HH : mm : ss"} ticking={true} />
      </p>
      <h1>
        {years}년 {months + 1}월 {dates}일 {today}요일
      </h1>
      <h4>할 일 {unChecked.length}개 남음</h4>
      <div></div>
    </TodoHeaderStyle>
  );
};

export default TodoHeader;
