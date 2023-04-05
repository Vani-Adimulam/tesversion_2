import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="container">
      
    <div className="navbar navbar-expand-lg navbar-dark bg-dark" style={{justifyContent:"space-between"}}>
    <span style={{float:"left",fontSize:"40px",fontWeight:"650"}} className="navbar-brand">Online Assesment  
     </span>
    
    
  <div>
<Link to="/login" className='navbar-brand' style={{marginRight:"150px"}}><h3>Evaluator</h3></Link>
<Link to="/verify-email" className='navbar-brand' style={{marginRight:"150px"}}><h3>Candidate</h3></Link>
  </div>
   
   
      
    
      
    </div>
    </div>

  )
}

export default Nav