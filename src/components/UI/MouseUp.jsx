const MouseUp = () => {
  return (
    <>
      <div className="w-7 h-11 border-2 border-gray-800 dark:border-white rounded-full flex justify-center items-start relative transition-all duration-300 ease-in-out">
        <div className="w-2 h-3 bg-gray-800 dark:bg-white rounded-full animate-scroll"></div>
      </div>
      <span className="text-gray-800 dark:text-white text-xl mt-2 animate-bounce">
        ↑
      </span>
    </>
  );
};

export default MouseUp;
