import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as yup from 'yup'

import Form from './components/Form'
import User from './components/User'
import formSchema from './components/FormSchema'

const initialFormValues = {
  // text inputs
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  // checkbox
  tos: false
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  tos: ''
}

function App() {
  // states
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)

  // helpers
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res.data.data)
        setUsers(res.data.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([ res.data, ...users ])
      })
      .catch(err => {
        debugger
      })
      setFormValues(initialFormValues)
  }

  // event handlers
  const inputChange = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        // success
        setFormErrors({ ...formErrors, [name]: '' })
      })
      .catch(err => {
        // failure
        console.log(err.errors)
        setFormErrors({ ...formErrors, [name]: err.errors[0] })
      })
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }
    postNewUser(newUser)
  }

  // side effects
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  
  return (
    <div className="App">
      <header><h1>Create your Account - it's easy!</h1></header>

      <Form
        values={formValues}
        submit={formSubmit}
        change={inputChange}
        disabled={disabled}
        errors={formErrors}
      />

      <h2>Existing Users:</h2>
      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }

    </div>
  );
}

export default App;
