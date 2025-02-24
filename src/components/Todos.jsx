import TodoItem from "./TodoItem";
import { useTodos } from "./store/todo-context";

const Todos = () => {
  const { todoList, isLoading, handleInputChange } = useTodos();

  return (
    <div className="w-full max-w-[48rem] p-4 flex flex-col items-center space-y-4 overflow-y-auto max-h-[60vh]">
      {isLoading && <h3>Loading todos...</h3>}
      {todoList.map((todo) => (
        <TodoItem
          key={todo._id}
          id={todo._id}
          title={todo.title}
          handleChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default Todos;
