import { useRef } from "react";
import { useTodos } from "./store/todo-context";

const AddTodo = () => {
  const inputRef = useRef(null);
  const { addNewTodo } = useTodos();

   return (
    <div className="flex flex-col items-center w-full max-w-[48rem] p-4 space-y-4">
      <input
        ref={inputRef}
        className="w-full p-2 border border-b-gray-600 focus-visible:outline-gray-600"
        type="text"
        placeholder="Add a new todo"
      />
      <button className="cursor-pointer" onClick={() => addNewTodo(inputRef.current?.value || null)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-7"
        >
          <path
            fillRule="evenodd"
            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddTodo;
