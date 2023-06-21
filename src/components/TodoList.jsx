import {useState, useEffect} from "react";

function TodoList() {
  const [todos, setTodos] = useState([]); // todo list를 담는 state, 초기 값은 빈 배열
  const [inputValue, setInputValue] = useState(""); // 입력한 todo를 담는 state, 초기 값은 빈 문자열
  const [count, setCount] = useState(0); // 완료한 todo의 개수를 담는 state, 초기 값은 0

  useEffect(() => {
    const data = [
      // 이곳에 초기 렌더링 시 표시 될 '객체 형태의 할 일들'을 작성해주세요. (hint: 객체의 key는 id, text, completed 입니다.)
      {id : 1,  text : "산책 하기", completed : false},
      {id : 2, text : "멋사 과제", completed : true},
      {id : 3, text : "야구 보기", completed : false}
    ];
    // 생성한 todo를 state의 상태 변수인 todos 에 저장해주세요
    setTodos(data);
  }, []);


  useEffect(() => {
    let n = 0; //n은 완료한 todos의 개수, i는 인덱스 번호를 담을 변수 

    for(let i = 0; i < todos.length; i++){
      if(todos[i].completed === true){
        n++;
      }
    }

    setCount(n)
    // 이곳에 todos에 변화가 생길 때마다 완료한 할 일의 개수(count)를 'update' 하도록 하는 코드를 작성해주세요. (+ dependency array 에는 어떤 값이 들어가야 할까요?)

  }, [todos]); //todos가 변화하니깐 

  useEffect(() => {
      if(count == todos.length){
        alert ("오늘 할 일을 모두 완료하셨네요!")
      }
    // 이곳에 count의 update를 감지하면서 모든 할 일 모두 완료했을 때 "오늘 할 일을 모두 완료하셨네요!"를 출력하는 알림창이 뜨도록 코드를 작성해주세요. (+ dependency array 에는 어떤 값이 들어가야 할까요?)
  }, [count]);

  const handleInput = (e) => {
    setInputValue(e.target.value) //입력한 값을 받아오고 싶을 경우 value를 실행!
    // 이곳에 입력창에 입력한 값이 state의 상태 변수인 inputValue에 저장되도록 코드를 작성해주세요.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {id: Date.now(), text : inputValue, completed : false /* 이곳에 새로운 todo의 text와 completed 속성을 설정하도록 코드를 작성해주세요 */}; //아직 완료 안 했으니 false로 completed 설정
    setTodos([...todos, newTodo]/* 이곳에 기존의 todos에 새로 생성된 newTodo를 추가하도록 하는 코드를 작성해주세요 (hint: 배열에서의 spread 연산자 활용) */);
    setInputValue("");
  ;}

  const handleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo, completed : !todo.completed 
          /* 이곳에 기존의 todo의 객체 속성에서 completed 객체의 속성만 변경되도록 하는 코드를 작성해주세요 (hint: 객체에서의 spread 연산자 활용) */
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos)
  } //id는 삭제하려는 고유한 값, updateTodos는 삭제 대상 항목이 제거된 새로운 배열



  return (
    <div className="todolist">
      <h1>Todo List</h1>
      <p>현재 {count}개 완료</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span onClick={() => handleTodo(todo.id)} style={{textDecoration: todo.completed ? "line-through" : "none"}}>
              {todo.text}
            </span>
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInput} />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

export default TodoList;