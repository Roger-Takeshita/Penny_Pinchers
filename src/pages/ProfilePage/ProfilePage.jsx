import React, { Component } from 'react';
import apiService from '../../utils/apiService';
import UserForm from '../../components/UserForm/UserForm';
import UserFrom from '../../components/UserForm/UserForm';

class ProfilePage extends Component {

    // async componentDidMount() {
    //     const data = await apiService.getUserBalance(`/api/user/`);
    //     // this.setState({data})
    //     console.log(data)
    // }

    render () {
        return (
            <div className="container">
                <UserFrom />
            </div>
        );
    };
};

export default ProfilePage;