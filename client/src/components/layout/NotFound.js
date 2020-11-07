import React from 'react'
import {Link} from 'react-router-dom';

function NotFound() {
    return (
        <div className="container">
            <h1>404 Not Found</h1>
            <h5>The Page you are looking for does not exist. Click <Link to="/dashboard">Here</Link> to go to the homepage</h5>
        </div>
    )
}

export default NotFound
