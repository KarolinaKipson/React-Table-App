import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required().label('Firstname'),
  surname: yup.string().required().label('Lastname'),
  email: yup.string().required().email().label('E-mail'),
  telephone: yup.string().required().label('Phone'),
});

// customer object will be validatedat trough schema defined
const validateFormYup = async (customer) => {
  let errors;
  try {
    // if error do not stop execution -> abortEarly: false
    await validationSchema.validate(customer, { abortEarly: false });
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
