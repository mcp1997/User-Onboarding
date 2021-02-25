import * as yup from 'yup'

const formSchema = yup.object().shape({
  first_name: yup.string()
    .trim()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters long'),
  last_name: yup.string()
    .trim()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters long'),
  email: yup.string()
    .email('Must be a valid email address')
    .required('Email is required'),
  password: yup.string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  tos: yup.boolean().oneOf([true], 'You are required to agree to the Terms of Service')
})

export default formSchema