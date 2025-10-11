import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

export default function TodoList(){
    let [todos, setTodos] = useState([{task: "sample-task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = ()=>{
        setTodos((prevTodos) =>{
            return [...todos, {task: newTodo, id: uuidv4(), isDone: false}];
        });
        setNewTodo("");
    };
    let updateTodoValue = (event)=>{
        setNewTodo(event.target.value);
    };
    let deleteTodo = (id)=>{
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id));
    };
    let markAllDone = ()=>{
        setTodos((prevtodos) =>
            prevtodos.map((todo)=>{
                return {
                    ...todo, 
                    isDone: true,
                };
            })
        );
    };
    let markAsDone = (id) =>{
        setTodos((prevtodos) =>
            prevtodos.map((todo)=>{
                if(todo.id == id){
                    return {
                        ...todo, 
                        isDone: true,                    
                    };
                }else{
                    return todo;
                }
            })
        );
    }

    return (
        <div>
            <input className="input-type" placeholder="Add some task in the todo-list" 
            value={newTodo}
            onChange={updateTodoValue}
            />
            <br /><br />
            <button onClick={addNewTask}>Add task</button>
            <br /><br />
            <hr />
            <h4>Todo List</h4>
            <ul className="list-item">
                {
                    todos.map((todo)=>(
                        <li key={todo.id}>
                            <span style={todo.isDone ? {textDecoration: "line-through"} : {}}>{todo.task}</span>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={() => deleteTodo(todo.id)} >Delete</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button onClick={() => markAsDone(todo.id)}>Mark one as Done</button>
                        </li>
                    ))
                }
            </ul>
            <button onClick={markAllDone} className="markAll">mark as All Done</button>
        </div>
    );
}