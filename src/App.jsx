import AddTodo from "./components/AddTodo.jsx";
import CompletedTodos from "./components/CompletedTodos.jsx";
import Navbar from "./components/NavBar.jsx";
import { useTheme } from "./components/store/theme-context.jsx";
import Todos from "./components/Todos.jsx";

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } transition-all duration-300`}
    >
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 dark:text-amber-50">
          LETS DO IT!
        </h1>
        <AddTodo />
        <Todos />
        <CompletedTodos />
      </div>
    </div>
  );
}

export default App;
