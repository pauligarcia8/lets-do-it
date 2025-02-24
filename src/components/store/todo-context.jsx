import { createContext, useContext, useEffect, useState } from "react";

// 1. Creamos el contexto con createContext y seteamos un objeto con lo que va a manejar el contexto y sus valores por defeto
export const TodoContext = createContext({
  todoList: [],
  isLoading: true,
  handleInputChange: () => {},
  addNewTodo: () => {},
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

  const editTodo = async (id, value) => {
    const response = await fetch(`https://api.nstack.in/v1/todos/${id}`, {
      method: "PUT",
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
    console.log('DATA DESDE EDIT', data);
  };

  const handleInputChange = (id, value) => {
    setTodoList((prev) =>
      prev.map((item) => (item._id === id ? { ...item, title: value } : item))
    );
    editTodo(id, value);
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
    console.log("DATA desde handleInputChange", data);
  };
  console.log("TodoList", todoList);

  //3. Retornamos el objeto provider con su valor para solo importar en App TodoContext y no todo el objeto
  return (
    <TodoContext.Provider
      value={{ todoList, isLoading, handleInputChange, addNewTodo }}
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
