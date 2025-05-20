import CommonForm from "../common-form";

const Register = () => {
  const fields = [
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Password", name: "password", type: "password", required: true },
  ];

  const handleRegister = (data) => {
    console.log("Registration form data:", data);
    // Add registration logic here
  };

  return (
    <CommonForm
      title="Registerr"
      fields={fields}
      onSubmit={handleRegister}
      buttonText="Registerrr"
    />
  );
};

export default Register;
