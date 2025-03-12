import { useRef, useState } from "react";
import { useTodos } from "./store/todo-context";
import ErrorMessage from "./UI/ErrorMessage.jsx";
import { CheckIcon } from "@heroicons/react/24/outline";

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
      <h1 className="text-2xl font-bold mb-4 dark:text-amber-50">
        LETS DO IT!
      </h1>
      <input
        ref={inputRef}
        className="w-full p-2 border focus-visible:outline-gray-600 m-0 text-black dark:text-white"
        type="text"
        placeholder="Add a new todo"
      />
      <ErrorMessage message="You can not add empty values" hidden={isEmpty} />
      <button className="cursor-pointer my-2" onClick={handleAddNewTodo}>
        <CheckIcon className="size-7" />
      </button>
    </div>
  );
};

export default AddTodo;
