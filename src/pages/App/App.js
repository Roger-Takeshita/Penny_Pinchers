import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import SignupPage from '../../pages/SingupPage/SignupPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import HomePage from '../../pages/HomePage/HomePage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import StorePage from '../../pages/StorePage/StorePage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import CategoryOnePage from '../../pages/CategoryOnePage/CategoryOnePage';
import CategoryTwoPage from '../../pages/CategoryTwoPage/CategoryTwoPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import ListsPage from '../../pages/ListsPage/ListsPage';
import NewListPage from '../../pages/NewListPage/NewListPage';
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
        let pages = userService.getUser() ?
        (
            <Switch>
                <Route exact path="/about" render={({ history }) => (
                    <AboutPage history={history} />
                )} />
                <Route exact path="/" render={({ history }) => (
                    <HomePage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/profile" render={({ history }) => (
                    <ProfilePage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/stores" render={({ history }) => (
                    <StorePage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/products" render={({ history }) => (
                    <ProductPage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/categoryone" render={({ history }) => (
                    <CategoryOnePage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/categorytwo" render={({ history }) => (
                    <CategoryTwoPage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/lists" render={({ history }) => (
                    <ListsPage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/newlist" render={({ history }) => (
                    <NewListPage history={history} user={this.state.user}/>
                )} />
                <Route render={() => <Redirect to={{ pathname: '/' }} />} />
            </Switch>
        )
        :
        (
            <Switch>
                <Route exact path="/about" render={({ history }) => (
                    <AboutPage history={history} />
                )} />
                <Route exact path="/" render={({ history }) => (
                    <HomePage history={history} user={this.state.user}/>
                )} />
                <Route exact path="/signup" render={({ history }) => (
                    <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
                )} />
                <Route exact path="/login" render={({ history }) => (
                    <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />
                )} />
                <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
            </Switch>
        );

        return (
            <div className="App">
                <NavBar user={this.state.user} handleLogout={this.handleLogout} />
                <main>
                    {pages}
                    {/* <Switch>
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
                    </Switch> */}
                </main>
                <footer>
                  <div>
                    <p><a href="https://github.com/roger-takeshita" target="blank"><span>Developed by</span>&nbsp;Roger Takeshita&nbsp;<img src="/github.png" alt="github" /></a></p>
                  </div>
                </footer>
            </div>
        );
    }
}

export default App;
