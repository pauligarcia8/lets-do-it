const ErrorMessage = ({ message, hidden }) => {
  return (
    <div className="self-start m-0 h-4">
      <p className={`text-red-700 text-sm ${!hidden ? "hidden" : ""}`}>
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
