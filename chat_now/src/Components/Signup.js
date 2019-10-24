import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import validator from 'validator';
import '../Css/Styles.css';
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      conformPassword: '',
      name_error: '',
      email_error: '',
      password_error: '',
      confirmPassword_error: '',
      validation: false,
      resultdata: ''
    }
  }
  signUp(event) {
    event.preventDefault();
    let email = this.refs.email.value;
    let name = this.refs.name.value;
    let password = this.refs.password.value;
    let confirmPassword = this.refs.confirmPassword.value;
    let securityQuestion = this.refs.securityQuestion.value;
    let error = [];
    if (validator.isAlpha(name)) {
      this.setState({
        name: name,
        name_error: ''
      });
      error.push(1);
    } else {
      this.setState({
        name_error: 'Name should contain only Alphabets'
      });
      error.push(0);
    }
    if (validator.isEmail(email)) {
      this.setState({
        email: email,
        email_error: '',
      });
      error.push(1);
    } else {
      this.setState({
        email_error: 'Enter a valid Email',
      });
      error.push(0);
    }
    if (validator.isAlphanumeric(password)) {
      this.setState({
        password: password,
        password_error: '',
      });
      error.push(1);
    } else {
      this.setState({
        password_error: 'No special characters allowed',
      });
      error.push(0);
    }
    if (password === confirmPassword) {
      this.setState({
        confirmPassword: confirmPassword,
        confirmPassword_error: '',
      });
      error.push(1);
    } else {
      this.setState({
        confirmPassword_error: 'Password should be same',
      });
      error.push(0);
    }
    if (validator.isAlpha(securityQuestion)) {
      this.setState({
        securityQuestion: securityQuestion,
        securityQuestion_error: '',
      });
      error.push(1);
    } else {
      this.setState({
        securityQuestion_error: 'Security Question should be Alphabets',
      });
      error.push(0);
    }
    if (!error.includes(0)) {
      axios.post(`http://172.24.125.244:8000/signup`, {
        name: this.refs.name.value,
        email: this.refs.email.value,
        password: this.refs.password.value,
        confirmPassword: this.refs.confirmPassword.value,
        securityQuestion: this.refs.securityQuestion.value,
      })
        .then(result => {
          axios.post(`http://172.24.125.244:8000/login`, {
            email: this.refs.email.value,
            password: this.refs.password.value,
          })
            .then(result => {
              localStorage.setItem("results", JSON.stringify(result.data[0]));
              const user_data = JSON.parse(localStorage.getItem("results"));
              localStorage.setItem("user_id", user_data._id);
              this.setState({
                validation: true,
                errorMessage: '',
                resultdata: JSON.parse(localStorage.getItem("results"))
              });
            });
        }).catch(err => {
          this.setState({
            email_error: "Email Exists",
            validation: false
          });
        });
    }
  }
  render() {
    if (this.state.validation) {
      return (<Redirect exact to="/messenger" />)
    }
    return (
      <div className="form-block  SingupStyle">
        <form onSubmit={this.signUp.bind(this)}>
          <label>User Name</label>
          <div className="input-group Data">
            <input className="form-control" ref="name" title="Enter Alphabets only" type="text" placeholder="User Name" onChange={event => this.setState({ name: event.target.value })} required />
          </div>
          <div className="Error">{this.state.name_error}</div>
          <label>Email</label>
          <div className="input-group Data">
            <input className="form-control" ref="email" title="Enter a valid Email" type="email" placeholder="Email" onChange={event => this.setState({ email: event.target.value })} required />
          </div>
          <div className="Error" >{this.state.email_error}</div>
          <label>Password</label>
          <div className="input-group Data">
            <input className="form-control" maxLength="10" ref="password" title="Password should be Alphanumeric with maxlength 10" type="password" placeholder="Password" onChange={event => this.setState({ password: event.target.value })} required />
          </div>
          <div className="Error">{this.state.password_error}</div>
          <label>Re-Enter Password</label>
          <div className="input-group Data">
            <input className="form-control" maxLength="10" ref="confirmPassword" title="Password should be Alphanumeric with maxlength 10" type="password" placeholder="Confirm Password" onChange={event => this.setState({ confirmPassword: event.target.value })} required />
          </div>
          <div className="Error">{this.state.confirmPassword_error}</div>
          <label>Security Question-Favourite color ?</label>
          <div className="input-group Data">
            <input className="form-control" ref="securityQuestion" title="Enter a valid answer" type="text" placeholder="Your answer" onChange={event => this.setState({ securityQuestion: event.target.value })} required />
          </div>
          <div className="input-group">
            <button type="submit" className="btn btn-primary btn-md Submit">Submit</button>
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
export default Signup;
