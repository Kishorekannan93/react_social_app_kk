import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className="Missing">
      <h2>Page Note Found</h2>
      <p>well,that's disoppointing</p>
      <Link to='/'><p>visit our home Page</p> </Link> 
      
    </main>
  )
}

export default Missing