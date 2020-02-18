import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import styles from './SignupForm.module.css';

class SignupForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConf: ''
    };

    //! This single method can handled updating the state for any number of <input>s!
        handleChange = (e) => {
            this.props.updateMessage('');
            this.setState({
                [e.target.name]: e.target.value         //+ Using ES2015 Computed Property Names
            });
        }

    //! Submit the form
        handleSubmit = async (e) => {
            e.preventDefault();                         //+ Prevent default
            try {                                           
                await userService.signup(this.state);   //+ Await to save the new user
                this.props.handleSignupOrLogin()        //+ Successfully signed up - show the home page
                this.props.history.push('/');           //+ Push the home page to the history
            } catch (err) {
                this.props.updateMessage(err.message);  //+ Invalid user data (probably duplicate email)
            }
        }

    isFormInvalid() {
        return !(this.state.firstName && this.state.lastName && this.state.email && this.state.password === this.state.passwordConf);
    }

    render() {
        return (
            <div>
                <header className={`${styles.SingupFormText} header-footer`}>Sign Up</header>
                <form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="text" className="form-control" placeholder="First Name" value={this.state.firstName} name="firstName" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="text" className="form-control" placeholder="Last Name" value={this.state.lastName} name="lastName" onChange={this.handleChange} />
                        </div>
                    </div>
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
                        <div className="col-sm-12">
                            <input autoComplete="new-password" type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <button className="btn btn-default" disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
                            <Link to='/'>Cancel</Link>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <Link to='/login'>Log In</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupForm;
