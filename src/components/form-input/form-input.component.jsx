import './form-input.styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  //it custom component takes Props Object and then we (1) destructure it
  // the (2) rest parameter / rest propert ...rest will store all remaining properties of the object
  //or array into a new object or array.
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
// we use the Spread syntax (...) allows an iterable, such as an array or string,
//to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
//In an object literal, the spread syntax enumerates the properties of an object and adds the key-value pairs to the object being created.

export default FormInput;
