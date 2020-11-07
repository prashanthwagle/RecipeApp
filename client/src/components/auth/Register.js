import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";


function Register(props) {
    // constructor() {
    //     super();
    //     this.state = {
    //     name: "",
    //     email: "",
    //     password: "",
    //     password2: "",
    //     errors: {}
    //     };
    // }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState({})



    useEffect( ()=>{
        if (props.errors) {
            setErrors(props.errors)
        }
        },
        [props])

        //If the user is authenticated, redirect to the dashboard
    useEffect(()=>{
            if (props.auth.isAuthenticated) {
                props.history.push("/dashboard");
            }
        },[])

    const onChange = e => {
        switch(e.target.id){
            case "name": setName(e.target.value)
                            break;
            case "email": setEmail(e.target.value)
                            break;
            case "password": setPassword(e.target.value)
                            break;
            case "password2": setPassword2(e.target.value)
                            break;
        }
        
    }

    const onSubmit = e => {
        e.preventDefault();
    
        const newUser = {
            name,
            email,
            password,
            password2
        };

        props.registerUser(newUser,props.history); 
    };

    return (
        <div className="container">
            <div className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
                </div>
                <form noValidate onSubmit={onSubmit}>
                <div className="input-field col s12">
                    <input
                    onChange={onChange}
                    value={name}
                    error={props.errors.name}
                    id="name"
                    type="text"
                    className={classnames("", {
                    invalid: props.errors.name
                    })}
                    />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={onChange}
                    value={email}
                    error={props.errors.email}
                    id="email"
                    type="email"
                    className={classnames("", {
                    invalid: props.errors.email
                    })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">{props.errors.email}</span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={onChange}
                    value={password}
                    error={props.errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                    invalid: props.errors.password
                    })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text">{props.errors.password}</span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={onChange}
                    value={password2}
                    error={props.errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                    invalid: props.errors.password2
                    })}
                    />
                    <label htmlFor="password2">Confirm Password</label>
                    <span className="red-text">{props.errors.password2}</span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Sign up
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        );
}



const mapStateToProps = state=>({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, {registerUser})(withRouter(Register));