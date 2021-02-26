import React from 'react'

export default function Form(props) {
  const { values, submit, change, disabled, errors } = props

  const onSubmit = e => {
    e.preventDefault()
    submit()
  }

  const onChange = e => {
    const { name, value, type, checked } = e.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='form-container'>
        <h2>Account Setup</h2>
        <div className='inputs'>
          <label>First Name
            <input
              value={values.first_name}
              onChange={onChange}
              name='first_name'
              type='text'
            />
          </label>

          <label>Last Name
            <input
              value={values.last_name}
              onChange={onChange}
              name='last_name'
              type='text'
            />
          </label>

          <label>Email
            <input
              value={values.email}
              onChange={onChange}
              name='email'
              type='email'
            />
          </label>

          <label>Password
            <input
                value={values.password}
                onChange={onChange}
                name='password'
                type='text'
              />
          </label>

          <label>Agree to Terms of Service
            <input
              type='checkbox'
              name='tos'
              onChange={onChange}
              checked={values.tos}
            />
          </label>
        </div>

        <div className='errors'>
          <div>{errors.first_name}</div>
          <div>{errors.last_name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.tos}</div>
        </div>

        <button id='submitBtn' disabled={disabled}>Create Account</button>

      </div>
    </form>
  )
}