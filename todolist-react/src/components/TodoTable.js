import React from "react";
import styled from "styled-components";

const TodoTableStyle = styled.div`
  width: 350px;
  height: 470px;
  padding: 10px;
  border-radius: 10px;
  background: white;
`;

const TodoTable = ({ children }) => {
  return <TodoTableStyle>{children}</TodoTableStyle>;
};

export default TodoTable;
