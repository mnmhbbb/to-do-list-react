# To Do List (react Ver.)  
https://mnmhbbb.github.io/to-do-list-react
### 1. 이름: 할 일 목록 관리 앱 리액트로 만들기  
### 2. 사용한 기술:   
React - useReducer, useContext(Context API), react-live-clock 등
### 3. 주요 기능 및 특징   
![gif](https://user-images.githubusercontent.com/66292371/109854558-87cb7d80-7c9a-11eb-9c33-66274f8752a2.gif)
- 바닐라자바스크립트로 구현한 기능을 거의 동일하게 만들었다.
- 스타일링은 `styled-components`를 사용하였다. 클래스이름 짓는 고민을 덜 수 있어서 좋았다.
- 구현 중 막히는 부분은 벨로퍼트님의 [투두리스트](https://react.vlpt.us/mashup-todolist/) 자료를 보고 추가 공부하였다.
- Reducer와 Context api를 사용하여, state를 효율적으로 관리하고 넘길 수 있었다.
- 컴포넌트 구조
- ![img](https://user-images.githubusercontent.com/66292371/112706345-ef19cd80-8ee6-11eb-8f5c-5cadfea1d11f.png)
  - TodoTable.js: 모든 컴포넌트를 감싸는 테이블 역할을 함
  - TodoHeader.js: 헤더부분, 1초마다 바뀌는 시계와 현재 체크가 되지 않은 목록을 나타냄
  - TodoList.js: map 함수로 TodoItem을 렌더링하여 할 일 목록들을 가지고 있음. 
    - TodoItem.js: 목록의 각 요소들이며, 체크여부와 삭제기능이 담겨있음
  - TodoInput.js: 입력하는 부분이며, 입력한 대로 리스트에 보여짐
  - TodoContext.js: 전체 데이터를 관리하는 저장소 역할을 함. 여기서 초기값과 액션을 만들어서 배포함. 커스텀 훅을 이곳에서 사용함.
```javascript
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
```  
- 위와 같이 초기값과 각 이벤트에 넣을 액션들을 작성하고,
```javascript
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
```
- state와 dispatch 중 필요한 것만 가져올 수 있도록 각각을 `createContext()`로 작성하였다.
- 각각 `value`에 state와 dispatch를 전달하며, `TodoNextIdContext`는 고유한 id 값을 결정한다.
```javascript
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
```
- 각 컴포넌트에서 `useContext`를 사용하여 원하는 동작을 실행시킬 수 있지만, 커스텀 훅을 사용할 수 있다는 것을 알게 되었다.
- `useTodoState`와 같은 이름으로 함수를 만들어 내보내는 것이다. 
```javascript
const TodoHeader = () => {
  const state = useTodoState();
  // const state = useContext(TodoStateContext);
```
- 그러면, 아래 주석처리한 코드 대신 간단하게 state 값을 가져올 수 있다.
- 새로운 할 일 항목을 추가할 때 `concat(action.todo)`로 불변성을 유지하면서 새로운 항목을 추가하는 액션을 실행하는데,  
  그 todo에 들어갈 값을 다음과 같이 작성한다.
```javascript
const TodoInput = () => {
  const [value, setValue] = useState("");
  const dispatch = useTodoDispatch();
  const nexdId = useTodoNexId();

  const onChange = (e) => setValue(e.target.value);

  const addItem = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD",
      
      //새로운 항목 추가
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
```
### 4. 기타
- 1초마다 바뀌는 시계 부분을 구현하려고 고민하던 중 `react-live-clock` 라이브러리를 알게 되어서 사용하였다.
- `npm i react-live-clock react-moment moment-timezone` 을 설치하고 공식문서에 나온 형식으로   
  `<Clock format={"HH : mm : ss"} ticking={true} />` 이와 같이 작성하였다.
- 바닐라자바스크립트로 완성한 `scrollIntoView` 기능도 동일하게 넣으려고 했으나 아직 공부 중이다.
- useRef을 활용하고 react-scroll-into-view 설치 후 컴포넌트 작성하고 props로 block: center 해봤으나 실패,,
