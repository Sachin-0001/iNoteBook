// Alert.js
const Alert = ({ type, message }) => {
    const alertClass = {
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      info: "bg-blue-500 text-white",
    };
  
    return (
      <div
        className={`p-4 mb-4 text-sm rounded-lg ${alertClass[type] || alertClass.info}`}
        role="alert"
      >
        {message}
      </div>
    );
  };
  
  export default Alert;
  