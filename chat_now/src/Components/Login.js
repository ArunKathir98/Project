import React, { Component } from 'react';
import {
  Link,
  Redirect
} from "react-router-dom";
import axios from 'axios';
import '../Css/Styles.css';
import '../Css/MediaQuerry.css';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validation: false,
      errorMessage: '',
      resultdata: null
    }
  }
  clearError(event) {
    event.preventDefault();
    this.setState({
      errorMessage: '',
    });
  }
  logIn(event) {
    event.preventDefault();
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
      }).catch(err => {
        this.setState({
          validation: false,
          errorMessage: 'Invalid User'
        });
      });
  }
  render() {
    if (this.state.validation) {
      return (<Redirect exact to="/messenger" />)
    }
    return (
      <div className="form-block FormStyleLogin">
        <form onSubmit={this.logIn.bind(this)}>
          <div className="Error"> {this.state.errorMessage} </div>
          <label className="labelLogin">Email</label>
          <div className="form-group">
            <input className="form-control" ref="email" title="Enter a valid email" type="email" placeholder="Email" onChange={event => this.setState({ email: event.target.value })} required />
          </div>
          <div className="Error"> {this.state.email_error} </div>
          <label className="labelLogin">Password</label>
          <div className="form-group">
            <input className="form-control" title="Enter a valid password" maxLength="10" ref="password" type="password" placeholder="Password" onChange={event => this.setState({ password: event.target.value })} required />
          </div>
          <div className="Error"> {this.state.password_error} </div>
          <div className="input-group">
            <button type="submit" className="btn btn-primary btn-md Submit">Submit</button>
            <button type="reset" className="btn btn-primary btn-md Cancel" onClick={this.clearError.bind(this)}>Cancel</button>
          </div>

          <div className="Navigation">
            New User? <Link to="/signup" exact="true" >Register Here</Link>
          </div>
          <div className="ForgotPassword"><Link to="/forgotpassword" exact="true" >Forgot Password</Link></div>
        </form>
      </div>
    );
  }
}
export default Login;
