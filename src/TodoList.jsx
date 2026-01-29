import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";
//main function..
export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  //add New Task in the todo list.....
  const addNewTask = () => {
    if (newTodo.trim() === "") return;

    setTodos((prevTodos) => [
      ...prevTodos,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);
    setNewTodo("");
  };

  //update Todo Value......
  const updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  //Delete the todo......
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  //markAllDone function......
  const markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        isDone: true,
      })),
    );
  };

  //markAs done function....
  const markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo,
      ),
    );
  };

  return (
    <div className="todo-app">
      <input
        className="input-type"
        placeholder="Add some task in the todo-list"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br />
      <br />
      <button onClick={addNewTask}>Add task</button>
      <br />
      <br />
      <hr />
      <h4>Todo List</h4>

      <ul className="list-item">
        {todos.map((todo) => (
          <li key={todo.id}>
            <span style={todo.isDone ? { textDecoration: "line-through" } : {}}>
              {todo.task}
            </span>
            &nbsp;&nbsp;
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            &nbsp;&nbsp;
            <button onClick={() => markAsDone(todo.id)}>
              Mark one as Done
            </button>
          </li>
        ))}
      </ul>

      <button onClick={markAllDone} className="markAll">
        Mark All as Done
      </button>
    </div>
  );
}
