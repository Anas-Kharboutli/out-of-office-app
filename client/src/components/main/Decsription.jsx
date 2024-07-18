import React from 'react'
import { Link } from 'react-router-dom'

const Decsription = () => {
  return (
    <div className='pdf-container'>
        <h2>Back to 
             <Link to='/'> Home page</Link>
        </h2>
      <iframe title='description' src='/out-of-office-presentation.pdf'
      width={1000} height={600} />
    </div>
  )
}

export default Decsription
