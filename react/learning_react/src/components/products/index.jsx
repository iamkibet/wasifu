import PropTypes from "prop-types";
import ProductItem from "./components/product-item";
import { useEffect, useState } from "react";

const initialState = true;

function ProductList({ name, age, products }) {
  const [details, setDetails] = useState(initialState);
  const [count, setCount] = useState(0);
  const [style, setStyle] = useState(false);

  function handleToggleText() {
    setDetails(!details);
  }

  function handleCount() {
    setCount(count + 1);
  }

  useEffect(() => {
    setDetails(!details);
    return () => {
      console.log("unmounted"); 
    };
  }, []);

  useEffect(() => {
    if (count === 10) setStyle(true);
  }, [count]);

  console.log(style);
  return (
    <div>
      <h1>Products List</h1>
      <button onClick={handleToggleText}>Toggle text</button>
      <button
        style={{ backgroundColor: style ? "black" : "white" }}
        onClick={handleCount}
      >
        Increase count
      </button>
      {/* <ProductItem /> */}
      {details ? (
        <h4>
          name is {name}, and he is {age} years old
        </h4>
      ) : (
        <h2>No people</h2>
      )}

      <div>the count is {count}</div>

      <ul>
        {products.map((item, index) => (
          <li key={index}>
            <ProductItem singleProduct={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
ProductList.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Expect each product to be an object with a 'name' property
    })
  ).isRequired,
};

export default ProductList;
