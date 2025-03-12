import { useRef, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo.jsx";
import CompletedTodos from "./components/CompletedTodos.jsx";
import Navbar from "./components/NavBar.jsx";
import Todos from "./components/Todos.jsx";
import MouseUp from "./components/UI/MouseUp.jsx";

import { useTheme } from "./components/store/theme-context.jsx";

function App() {
  const { theme } = useTheme();
  const [showScroll, setShowScroll] = useState(false);
  const completedRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200); // Muestra el botón si el usuario bajó más de 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    completedRef.current?.scrollIntoView({ behavior: "smooth" });
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
      {showScroll && (
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
