import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const Todos = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetch("https://api.nstack.in/v1/todos?page=1&limit=10")
      .then((response) => response.json())
      .then((todos) => {
        console.log("DATA", todos.items);
        setTodoList(todos.items);
      });
  }, []);

  const handleChange = (todoId, newTitle) => {
    console.log('HANDLE', todoId, newTitle)
    setTodoList((prev) =>
      prev.map((todo) =>
        todo._id === todoId ? { ...todo, title: newTitle } : todo
      )
    );
  };

  console.log("DATA", todoList);


  return (
    <div className="w-full max-w-[48rem] border p-4 space-y-4">
      {todoList.map((todo) => (
        <TodoItem
          key={todo._id} 
          id={todo._id}
          title={todo.title}
          handleChange={handleChange} 
        />
      ))}
    </div>
  );
};

export default Todos;