import React, { Component } from 'react';
import { Redirect, NavLink } from "react-router-dom";
import axios from 'axios';
import '../Css/Styles.css';
class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      validation: false,
      confirmPassword_error: '',
    }
  }
  changepassword(event) {
    event.preventDefault();
    if (this.refs.newPassword.value === this.refs.confirmPassword.value) {
      axios.put(`http://172.24.125.244:8000/signup/changepassword/${localStorage.getItem("user_id")}`, {
        oldPassword: this.refs.oldPassword.value,
        newPassword: this.refs.newPassword.value,
        confirmPassword: this.refs.confirmPassword.value,
      })
        .then(result => {
          console.log(result);
          this.setState({
            validation: true,
            confirmPassword_error: '',
          });
        }).catch(error => {
          console.log(error);
          this.setState({
            validation: false,
            confirmPassword_error: "Incorrect Old Password",
          });
        });
    } else {
      this.setState({
        validation: false,
        confirmPassword_error: 'Password Should be Same',
      })
    }
  }
  render() {
    if (localStorage.getItem("results") === null) {
      return (<Redirect to="/login" />);
    }
    if (this.state.validation) {
      return (<Redirect exact to="/login" />)
    }
    return (
      <div>
        <ul className="Home">
          {/* <li>
            <NavLink exact to="/messenger"><button className="ButtonHome">Back</button></NavLink>
          </li> */}
        </ul>
        <div className="form-block FormStyle">
          <form onSubmit={this.changepassword.bind(this)}>
            <label>Old Password</label>
            <div className="input-group Data">
              <input className="form-control" ref="oldPassword" maxLength="10" title="Enter old password" type="password" placeholder="Old password" onChange={event => this.setState({ oldPassword: event.target.value })} required />
            </div>
            <label>New Password</label>
            <div className="input-group Data">
              <input className="form-control" maxLength="10" title="Password should be Alphanumeric values with maxlength 10" ref="newPassword" type="password" placeholder="New password" onChange={event => this.setState({ newPasswordpassword: event.target.value })} required />
            </div>
            <label>Confirm Password</label>
            <div className="input-group Data">
              <input className="form-control" maxLength="10" title="Password should be Alphanumeric values with maxlength 10" ref="confirmPassword" type="password" placeholder="Confirm New password" onChange={event => this.setState({ confirmPassword: event.target.value })} required />
            </div>
            <div className="Error">{this.state.confirmPassword_error}</div>
            <div className="input-group Data">
              <button type="submit" className="btn btn-primary btn-md Submit"> Submit</button>
              <NavLink exact to="/messenger"><button className="ButtonHome">Back</button></NavLink>

              {/* <button type="reset" className="btn btn-primary btn-md Cancel">Cancel</button> */}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default ChangePassword;
