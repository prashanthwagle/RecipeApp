import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logoutUser} from '../../actions/authActions'




const Navbar = (props)=>{

        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper blue">
                    <Link to="/dashboard" className="brand-logo center"><b>Recipe</b>App</Link> 
                    {props.isAuthenticated?
                    <div className="container">
                        <Link className="left"  to="/dashboard/create">Add a Recipe</Link>
                        <ul id="nav-mobile" className="right">
                            <li><Link to="/dashboard/mine/">My Account</Link></li>
                            <li><a onClick={props.logoutUser}>Logout</a></li>
                        </ul>
                    </div>
                        : <div/>
                        }
                        </div>
                    
                </nav>
            </div>
        );

        

        
}

const mapStateToProps = (state)=>{
    console.log(JSON.stringify(state, null, 4));
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, {logoutUser})(Navbar);