import React, { Component } from 'react';
import apiService from '../../utils/apiService';

class ProfilePage extends Component {

    async componentDidMount() {
        const data = await apiService.getUserBalance(`/api/user/`);
        // this.setState({data})
        console.log(data)
    }

    render () {
        return (
            <div>ProfilePage</div>
        );
    };
};

export default ProfilePage;