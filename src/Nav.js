import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'
const Nav = () => {
  const {search,setsearch} = useContext(DataContext)
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e)=>e.preventDefault()}>
        <label htmlFor="search" >Search Post</label>
        <input
          id="search"
          type="text"
          autoFocus
          required
          placeholder='Search Post'
          value={search}
          onChange={(e)=>setsearch(e.target.value)}

        />

      </form>
      <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/post">Post</Link></li>
      </ul>
      
        
    </nav>
  )
}

export default Nav