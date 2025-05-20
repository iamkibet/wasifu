import PropTypes from "prop-types";

const CommonInput = ({ label, name, type, value, onChange, required }) => {
  // Inline styles
  const inputStyle = {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
      />
    </div>
  );
};

CommonInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
}; 

export default CommonInput;
