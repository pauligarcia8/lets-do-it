import { useRef, useState } from "react";
import AddTodo from "./components/AddTodo.jsx";
import CompletedTodos from "./components/CompletedTodos.jsx";
import Navbar from "./components/NavBar.jsx";
import { useTheme } from "./components/store/theme-context.jsx";
import Todos from "./components/Todos.jsx";
import MouseUp from "./components/UI/MouseUp.jsx";

function App() {
  const { theme } = useTheme();
  const [scroll, setScroll] = useState(false);
  const completedRef = useRef();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScroll(!scroll);
  };
  const scrollToBottom = () => {
    completedRef.current?.scrollIntoView({ behavior: "smooth" });
    setScroll(!scroll);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } transition-all duration-300`}
    >
      <Navbar>
        <button
          className="cursor-pointer mx-2 border-b-2 border-transparent hover:border-gray-800 pb-1 transition-all
         duration-300 ease-in-out dark:hover:border-white"
          onClick={scrollToBottom}
        >
          Go to completed todos
        </button>
      </Navbar>
      <div className="h-screen flex flex-col items-center justify-start">
        <AddTodo />
        <Todos />
      </div>
      <CompletedTodos ref={completedRef} />
      {scroll && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 cursor-pointer flex flex-col items-center"
        >
          <MouseUp />
        </div>
      )}
    </div>
  );
}

export default App;
