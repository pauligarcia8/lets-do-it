import { createContext, useContext, useEffect, useState } from "react";

// 1. Creamos el contexto con createContext y seteamos un objeto con lo que va a manejar el contexto y sus valores por defeto
export const TodoContext = createContext({
  todoList: [],
  isLoading: true,
  handleInputChange: () => {},
  addNewTodo: () => {},
  deleteTodo: () => {},
});

// 2. Creamos el proveedor que es quien se encargara de realizar todas las tareas, y aceptamos children ya que este proveedor encapsulara los componentes que tienen que acceder al estado global

const TodosProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);

  const fetchTodos = async () => {
    setIsLoading(true);
    const response = await fetch(
      "https://api.nstack.in/v1/todos?page=1&limit=20"
    );
    const data = await response.json();
    setTodoList(data.items);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const editTodo = async (id, updatedFields) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, ...updatedFields } : item
      )
    );

    const todo = todoList.find((item) => item._id === id);
    if (!todo) return;

    const updatedTodo = { ...todo, ...updatedFields };
    const response = await fetch(`https://api.nstack.in/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const data = await response.json();
    console.log("DATA DESDE EDIT", data);
  };

  const handleUpdateField = (id, updatedFields) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, ...updatedFields } : item
      )
    );
    editTodo(id, updatedFields);
  };

  const handleInputChange = (id, value) => {
    console.log("A CAMBIAR", id, value);
    if (typeof value === "boolean") {
      handleUpdateField(id, { is_completed: value });
    } else {
      handleUpdateField(id, { title: value });
    }
  };

  const addNewTodo = async (value) => {
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
    const data = await response.json();
    fetchTodos();
  };
  console.log("TodoList", todoList);

  const deleteTodo = async (id) => {
    console.log("DELETE ID", id);
    const response = await fetch(`https://api.nstack.in/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    fetchTodos();
  };

  //3. Retornamos el objeto provider con su valor para solo importar en App TodoContext y no todo el objeto
  return (
    <TodoContext.Provider
      value={{
        todoList,
        isLoading,
        handleInputChange,
        addNewTodo,
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
