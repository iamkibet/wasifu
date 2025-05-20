import { useState } from "react";
import CommonForm from "../common-form";


const Form = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and register
  };

  const commonFields = [
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const registrationFields = [
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
    },
  ];

  const allFieldsLogin = [...commonFields];
  const allFieldsRegister = [...commonFields, ...registrationFields];

  // Container style with transition for background color
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: isLogin ? "#f0f8ff" : "#f8f0ff",
    transition: "background-color 0.5s ease",
  };

  // Styles for the switcher button
  const switcherStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: isLogin ? "#007BFF" : "#FF69B4",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.5s ease",
    marginTop: "20px",
  };

  // Form styling
  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    opacity: 1,
  };

  return (
    <div style={containerStyle}>
      <div
        className={isLogin ? "form-container login" : "form-container register"}
        style={formStyle}
      >
        {isLogin ? (
          <CommonForm
            title="Login"
            fields={allFieldsLogin}
            onSubmit={(data) => console.log("Login Data:", data)}
            buttonText="Login"
          />
        ) : (
          <CommonForm
            title="Register"
            fields={allFieldsRegister}
            onSubmit={(data) => console.log("Register Data:", data)}
            buttonText="Register"
          />
        )}
      </div>

      <button onClick={toggleForm} style={switcherStyle}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Form;
