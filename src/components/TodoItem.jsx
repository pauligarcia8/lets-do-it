import { useRef, useState } from "react";
import { useTodos } from "./store/todo-context";
import { PencilIcon, TrashIcon, CheckIcon } from "@heroicons/react/24/outline";

const TodoItem = ({ id, title, isCompleted }) => {
  const [edit, setEdit] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const { handleInputChange, deleteTodo } = useTodos();
  const inputRef = useRef(null);

  const handleEdit = () => {
    setEdit(!edit);
    handleInputChange(id, localTitle);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="flex items-center justify-between w-full border">
      <input
        ref={inputRef}
        className="w-full p-2 focus-visible:outline-gray-600"
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        disabled={!edit}
      />
      <div className="flex items-center justify-center px-2">
        <input
          type="checkbox"
          className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
          onChange={(e) => handleInputChange(id, e.target.checked)}
          checked={isCompleted}
        />
        <button className="px-4 cursor-pointer" onClick={handleEdit}>
          {!edit ? (
            <PencilIcon className="w-4" />
          ) : (
            <CheckIcon className="w-4" />
          )}
        </button>
        <button className="cursor-pointer" onClick={() => deleteTodo(id)}>
          <TrashIcon className="w-4" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
