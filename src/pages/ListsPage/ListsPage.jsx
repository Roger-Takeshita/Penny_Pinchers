import React, { Component } from 'react';

class ListsPage extends Component {
    state = {
        data: null
    }

    // async componentDidMount() {
    //     const data = await apiService.getMyLists(this.props.user);
    //     this.setState({data: data})
    //     console.log(data)
    // }

    render () {
        return (
            <div>
                Lists Page:
            </div>
        );
    };
};

export default ListsPage;