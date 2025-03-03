import { useRef, useState } from "react";
import { useTodos } from "./store/todo-context";
import ErrorMessage from "./UI/ErrorMessage.jsx";
const AddTodo = () => {
  const inputRef = useRef(null);
  const { addNewTodo } = useTodos();
  const [isEmpty, setIsEmpty] = useState(false);

  const handleAddNewTodo = () => {
    if (inputRef.current?.value === "") {
      setIsEmpty(true);
    } else if (inputRef.current) {
      addNewTodo(inputRef.current?.value);
      setIsEmpty(false);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[48rem] p-4 space-y-4">
      <input
        ref={inputRef}
        className="w-full p-2 border focus-visible:outline-gray-600 m-0 text-black dark:text-white"
        type="text"
        placeholder="Add a new todo"
      />
      <ErrorMessage message="You can not add empty values" hidden={isEmpty} />
      <button className="cursor-pointer my-2" onClick={handleAddNewTodo}>
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
