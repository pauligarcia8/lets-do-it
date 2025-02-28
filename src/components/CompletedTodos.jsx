import { useTodos } from "./store/todo-context";

const CompletedTodos = () => {
  const { todoList, handleInputChange } = useTodos();

  const completedTodos = todoList.filter((todo) => todo.is_completed === true);

  return (
    <div className="w-full max-w-[48rem] p-4 flex flex-col items-center space-y-4 max-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">
        {completedTodos.length > 0 ? "COMPLETED!" : `Nothing done yet...`}
      </h1>
      {completedTodos.map((todo) => (
        <div key={todo._id} className="flex items-center justify-start w-full">
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
            onChange={(e) => handleInputChange(todo._id, e.target.checked)}
            checked={todo.is_completed}
          />
          <h2 className="font-medium px-1">{todo.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodos;
