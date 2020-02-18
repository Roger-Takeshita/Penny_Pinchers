import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import userService from '../../utils/userService';

class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        message: ''
    };

    //! This single method can handled updating the state for any number of <input>s!
        handleChange = (e) => {
            this.setState({
                message: '',
                [e.target.name]: e.target.value                 //+ Using ES2015 Computed Property Names
            });
        };

    //! Submit the form
        handleSubmit = async (e) => {
            e.preventDefault();                                 //+ Prevent default
            try {                                               //+ Catching erros
                await userService.login(this.state);                //- Await to log in
                this.props.handleSignupOrLogin()                    //- Successfully logged in - show the home page
                this.props.history.push('/');                       //- Push the home page to the history
            } catch (err) {                                     //+ If error
                this.setState({message: 'Invalid Credentials!'});   //+ Invalid email or password
            }
        }


    render () {
        return (
            <div className={styles.LoginPage}>
                <header className="header-footer">Log In</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input autoComplete="username" type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                        </div>
                        </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input autoComplete="new-password" type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-default">Log In</button>&nbsp;&nbsp;&nbsp;
                            <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <Link to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                    <p>{this.state.message}</p>
                </form>
            </div>
        );
    };
};

export default LoginPage;