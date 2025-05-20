import CommonForm from "../common-form";




const Login = () => {
  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const handleLogin = (data) => {
    console.log("Login form data:", data);
    // Add login logic here
  };

  return (
    <CommonForm
      title="Login"
      fields={fields}
      onSubmit={handleLogin} 
      buttonText="Login"
    />
  );
};

export default Login;
