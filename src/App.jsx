import Todos from "./components/Todos.jsx";

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">LETS DO IT!</h1>
      <Todos />
    </div>
  );
}

export default App;
