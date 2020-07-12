import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required().label('Username'),
  surname: yup.string().required().password().label('Password'),
});

// customer object will be validatedat trough schema defined
const validateFormYup = async (user) => {
  let errors;
  try {
    // if error do not stop execution -> abortEarly: false
    await validationSchema.validate(user, { abortEarly: false });
  } catch (error) {
    errors = error;
  }
  if (!errors) {
    return null;
  }
  console.log(errors);
  const yupErrors = {};
  errors.inner.forEach((validationError) => {
    yupErrors[validationError.path] = validationError.message;
  });
  return yupErrors;
};
const getPropertyValidationErrorYup = async ({ name, value }) => {
  const customerPropertyObject = { [name]: value };
  const customerPropertyValidationSchema = yup.object().shape({
    [name]: validationSchema.fields[name],
  });
  let error;
  try {
    await customerPropertyValidationSchema.validate(customerPropertyObject);
  } catch (err) {
    error = err;
  }
  return error ? error : null;
};
export { validateFormYup, getPropertyValidationErrorYup };
