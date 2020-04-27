import React from 'react';
import './User.css';


class User extends React.Component{

    render() {
        return (
            <div className="user">
                User: <span className="username">{this.props.username}</span>
            </div>
        )
    }
}

export default User;