import React from 'react'

export default function User(props) {
  const { details } = props

  if (!details) {
    return <h3>Fetching User details...</h3>
  }

  return (
    <div className='user-container'>
      <h3>{details.first_name} {details.last_name}</h3>
      <p>Email: {details.email}</p>
    </div>
  )
}