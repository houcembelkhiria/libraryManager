import React from 'react'
import { Link } from "react-router-dom";  
import "../styles/Administration.css"; // Import the CSS file for styling

function Administration() {
    return (
        <div className='administrationCards'>
            <div className='administrationCard'>
                
                <Link to={`/bookList`}>
                <h1>Books</h1>
              </Link>
            </div>

            <div className='administrationCard'>
                
                <Link to={`/UserList`}>
                <h1>Users</h1>
              </Link>
            </div>
            
        </div>
    )
}

export default Administration
