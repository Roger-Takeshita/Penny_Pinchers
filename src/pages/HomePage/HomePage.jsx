import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    render () {
        return (
            <div>
                <div className="container text-center ">
                    <p>Home Page</p>
                    <Link to="/lists"><img src="/blank_page.png" alt="blank" /></Link>
                </div>
            </div>
        );
    };
};

export default HomePage;