import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import '../Css/Styles.css';
class ForgotPassword extends Component {
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
  forgotpassword(event) {
    event.preventDefault();
    if (this.refs.newPassword.value === this.refs.confirmPassword.value) {
      axios.put(`http://172.24.125.244:8000/signup/forgotpassword/${this.refs.email.value}`, {
        email: this.refs.email.value,
        securityQuestion: this.refs.securityQuestion.value,
        newPassword: this.refs.newPassword.value,
        confirmPassword: this.refs.confirmPassword.value,
      })
        .then(result => {
          this.setState({
            validation: true,
            confirmPassword_error: '',
          });
        }).catch(err => {
          this.setState({
            validation: false,
            confirmPassword_error: "Incorrect Security Answer",
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
    if (this.state.validation) {
      return (<Redirect exact to="/login" />)
    }
    return (
      <div className="form-block FormStyle">
        <form onSubmit={this.forgotpassword.bind(this)}>
          <label>Email</label>
          <div className="input-group Data">
            <input className="form-control" ref="email" title="Enter a valid email" type="email" placeholder="Email" onChange={event => this.setState({ email: event.target.value })} required />
          </div>
          <label>Which is your favourite color?</label>
          <div className="input-group Data">
            <input className="form-control" ref="securityQuestion" title="Enter a valid answer" type="text" placeholder="Security Question " onChange={event => this.setState({ securityQuestion: event.target.value })} required />
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
            <button type="reset" className="btn btn-primary btn-md Cancel">Cancel</button>
          </div>
          <div className="Navigation">
            Have an Account? <Link to="/login" exact="true" >Login</Link>
          </div>
        </form>
      </div>
    );
  }
}
export default ForgotPassword;
