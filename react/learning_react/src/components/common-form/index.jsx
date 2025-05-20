import PropTypes from "prop-types";
import CommonInput from "../common-input";

const CommonForm = ({ title, fields, onSubmit, buttonText }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };
    

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <CommonInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            required={field.required}
          />
        ))}
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
};

CommonForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool.isRequired, 
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CommonForm;
