// const products = [
//   {
//     name: "Product 1",
//   },
//   {
//     name: "Product 2",
//   },
//   {
//     name: "Product 3",
//   },
// ];

// import ContexConcept from "./components/context-concept";
// import TextConcept from "./components/context-concept/text";
// import FormComponent from "./components/form";
import Form from "./components/form";
import "./styles.css"; 
// import Login from "./components/login";
// import UseReducerExample from "./components/reducer";
// import Register from "./components/register";

function App() {
  return (
    <div className="">
      <h1>Hello React</h1>
      {/* <FunctionalComponent />
      <ProductList products={products} name="Dennis" age="50" />
      <Users />
      <Recipes /> */}
      {/* <ContexConcept />
      <TextConcept />
      <UseReducerExample />
      <FormComponent /> */}
      <div>
        <Form />
      </div>
    </div>
  );
}

export default App;
