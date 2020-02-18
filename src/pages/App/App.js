import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import SignupPage from '../../pages/SingupPage/SignupPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import HomePage from '../../pages/HomePage/HomePage';
import userService from '../../utils/userService';

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: userService.getUser()
        };
    };

    handleSignupOrLogin = () => {
        this.setState({ user: userService.getUser() });
    };

    handleLogout = () => {
        userService.logout();
        this.setState({ user: null });
    };

    render() {
        return (
            <div className="App">
                <NavBar user={this.state.user} handleLogout={this.handleLogout} />
                <main>
                    <Switch>
                        <Route exact path="/" render={({ history }) => (
                            userService.getUser() ? 
                            (<HomePage history={history} user={this.state.user}/>)
                            :
                            (<Redirect history={history} to="/login" />)
                        )} />
                        <Route exact path="/signup" render={({ history }) => (
                            <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
                        )} />
                        <Route exact path="/login" render={({ history }) => (
                            <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
                        )} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
