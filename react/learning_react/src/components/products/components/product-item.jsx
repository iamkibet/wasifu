import PropTypes from "prop-types";

function ButtonComponent() {
  return <button>Click me</button>;
}

function ProductItem({ singleProduct }) {
  return (
    <div>
      <a>{singleProduct.name}</a>
      <ButtonComponent />
    </div>
  );
}

ProductItem.propTypes = {
  singleProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;
