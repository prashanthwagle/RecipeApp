import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    //componentWillReceiveProps is required if you want to update the state values with new props values, 
    //this method will get called whenever any change happens to props values.

    useEffect(()=>{
        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (props.errors) {
            setErrors(errors);
        }
    }
    , [props])
    


    useEffect(()=>{
        if (props.auth.isAuthenticated) 
            props.history.push("/dashboard");
    }, []);


    const onChange = e => {
        // this.setState({ [e.target.id]: e.target.value });

        switch(e.target.id){
            case "email": setEmail(e.target.value)
                            break;
            case "password": setPassword(e.target.value)
                            break;
        }
    };

    const onSubmit = e => {
        e.preventDefault();

        const userData = {
            email,
            password
        };
        props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };


    return (
        <div className="container">
            <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
                <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
                </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                </div>
                <form noValidate onSubmit={onSubmit}>
                <div className="input-field col s12">
                    <input
                    onChange={onChange}
                    value={email}
                    id="email"
                    type="email"
                    className={classnames("", {
                    invalid: props.errors.email || props.errors.emailnotfound
                    })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">
                        {props.errors.email}
                        {props.errors.emailnotfound}
                    </span>
                </div>
                <div className="input-field col s12">
                    <input
                    onChange={onChange}
                    value={password}
                    id="password"
                    type="password"
                    className={classnames("", {
                    invalid: props.errors.password || props.errors.passwordincorrect
                    })}
                    />
                    <label htmlFor="password">Password</label>
                    <span className="red-text">
                        {props.errors.password}
                        {props.errors.passwordincorrect}
                    </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "2px",
                        marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Login
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        );
}



const mapStateToProps = state =>{
    return{
        auth: state.auth,
        errors: state.errors
    }
}
export default connect(mapStateToProps,{ loginUser })(Login);