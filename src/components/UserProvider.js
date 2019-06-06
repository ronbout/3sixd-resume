import React, { Component } from "react";

// UserProvider sets up the context that will deal with
// users being logged in

export const UserContext = React.createContext({});

class UserProvider extends Component {
  state = {
    isLoggedIn: false,
    userInfo: {}
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
