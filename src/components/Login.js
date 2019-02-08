import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser, emptyAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    userSelected: false,
    userId: "",
    loginComplete: false
  }

  componentDidMount() {
    this.props.dispatch(emptyAuthedUser(this.state.userId));
  }


  render() {
    
    if (this.state.loginComplete) {
      return (<Redirect to="/home" />)
    }

    const loginUser = () => {
      if (!this.state.userSelected) {
        alert("Please select a user to login");
      } else {
        this.setState({ loginComplete: true });
        this.props.dispatch(setAuthedUser(this.state.userId));
      }
    }

    const handleSelect = (e) => {
      this.setState({ userSelected: true, userId: e.target.value })
    }
    return (
      <div className="login">
        <h3>You can select a user here:</h3>
        
        <div className="select">
          <select
            defaultValue={""}
            onChange={handleSelect.bind(this)}
          >
            <option value="" disabled>
              Select user...
            </option>
            {this.props.users.map(user => (
              <option key={user.id}>{user.id}</option>
            ))}
          </select>
          <button
            onClick={loginUser.bind(this)}
            className="button"
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  console.log(users)
  return {
    users: Object.values(users)
  };
}

export default connect(mapStateToProps)(Login);
