import { createContext, useContext, useEffect, useState } from "react";

// 1. Creamos el contexto con createContext y seteamos un objeto con lo que va a manejar el contexto y sus valores por defeto
export const TodoContext = createContext({
  todoList: [],
  isLoading: true,
  handleInputChange: () => {},
  addNewTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
});

// 2. Creamos el proveedor que es quien se encargara de realizar todas las tareas, y aceptamos children ya que este proveedor encapsulara los componentes que tienen que acceder al estado global

const TodosProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.nstack.in/v1/todos?page=1&limit=20"
      );

      if (!response.ok) {
        throw new Error("Error fetching the todo list");
      }
      const data = await response.json();
      setTodoList(data.items);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const editTodo = async (id, updatedFields) => {
    const todo = todoList.find((item) => item._id === id);
    if (!todo) return;

    setTodoList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, ...updatedFields } : item
      )
    );

    const updatedTodo = { ...todo, ...updatedFields };

    try {
      const response = await fetch(`https://api.nstack.in/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error("Error updating the todo list");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleInputChange = (id, value) => {

    if (typeof value === "boolean") {
      editTodo(id, { is_completed: value });
    } else {
      editTodo(id, { title: value });
    }
  };

  const addNewTodo = async (value) => {
    try {
      const response = await fetch("https://api.nstack.in/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value,
          description: "",
          is_completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setTodoList((prev) => [...prev, data.data]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://api.nstack.in/v1/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error deleting the todo");
      }

      setTodoList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //3. Retornamos el objeto provider con su valor para solo importar en App TodoContext y no todo el objeto
  return (
    <TodoContext.Provider
      value={{
        todoList,
        isLoading,
        handleInputChange,
        addNewTodo,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

//4. Podemos crear un custom hook pra retornar los valores usando el contexto creado

export const useTodos = () => {
  return useContext(TodoContext);
};

export default TodosProvider;
