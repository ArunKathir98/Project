import React, { Component } from 'react';
import '../Css/Message.css';
import axios from 'axios';
import io from "socket.io-client";
import { Link, Redirect } from "react-router-dom";
import user_image from '../Images/user_image.png';
import online from '../Images/online.png';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import moment from 'moment';
class Message extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      message: '',
      messages: [],
      onlineuser: [],
      userdata: '',
      logoutUser: false,
    }
    this.socket = io('172.24.125.244:8000');

    this.socket.on('messageList', function (data) {
      message(data);
    });

    this.socket.on('receivingMessage', function (data) {
      addMessage(data);
    });

    const message = (data) => {
      this.setState({ messages: [...this.state.messages, data] })
    }

    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] });
    };

    this.socket.on('onlineUsers', function (data) {
      updateUser(data);
    });

    const updateUser = (data) => {
      this.setState({ onlineuser: data.newuser });
    }
  }
  sendMessage(event) {
    event.preventDefault();
    axios.post(`http://172.24.125.244:8000/message`, {
      name: this.state.user.name,
      message: this.state.message,
      time: new Date(),
    }).then(result => {
      console.log(result);
    });
    this.socket.emit('sendingMessage', {
      author: this.state.user.name,
      message: this.state.message,
      time: moment(new Date()).format('h:mm:ss a'),
    });
    this.setState({ message: '' });
  }
  logout(event) {
    event.preventDefault();
    axios.delete(`http://172.24.125.244:8000/login/${this.state.user.name}`)
      .then(result => {
        this.socket.emit('newUser', {
          newuser: result.data
        });
        localStorage.clear();
        this.setState({
          logoutUser: true,
        });
      });
  }
  componentWillMount() {
    axios.get(`http://172.24.125.244:8000/login`)
      .then(result => {
        this.socket.emit('newUser', {
          newuser: result.data,
        });
      })
    axios.get(`http://172.24.125.244:8000/message`)
      .then(result => {
        const resultData = result.data.messageList;
        resultData.map(resultData => {
          this.socket.emit('oldMessage', {
            author: resultData.senderName,
            message: resultData.message,
            time: resultData.time,
          });
        })
      });
    this.setState({
      user: JSON.parse(localStorage.getItem("results"))
    });
  }
  render() {
    if (localStorage.getItem("results") === null) {
      return (<Redirect to="/login" />);
    }
    if (this.state.logoutUser) {
      return (<Redirect to="/login" />);
    }
    return (
      <div className="Message">
        <div className="OnlineUsers">
          <h4>ONLINE USERS</h4>
          {this.state.onlineuser.map(onlineUser => {
            if (!(onlineUser === this.state.user.name)) {
              return (
                <div>
                  <ul className="ListItem" key={onlineUser} >
                    <img src={online} className="Online" alt="online" />
                    {onlineUser}
                  </ul>
                </div>
              )
            }
          })}
        </div>

        <div className="Container">

          <div className="MessageList">
            {this.state.messages.map(message => {
              if (message.author === this.state.user.name) {
                return (
                  <div className="MyMessage">
                    {"You"}:{message.message}
                    <div className="Time">{message.time}</div>
                  </div>
                )
              } else {
                return (
                  <div className="TextMessage">
                    {message.author} : {message.message}
                    <div className="Time">{message.time}</div>
                  </div>
                )
              }
            })}
          </div>
          <div className="ChatBox">
            <form id="message-form" onSubmit={this.sendMessage.bind(this)}>
              <input type="text" id="message" className="MessageBox" placeholder="Write your message here..." value={this.state.message} onChange={event => this.setState({ message: event.target.value })} required />
              <input type="submit" className="btn btn-primary btn-sm Send" value="Send" />
            </form>
          </div>
        </div>
        <div className="Profile">
          <div className="User">
            <span className="UserImage">
              {this.state.user.image == null ? <img src={user_image} className="UserIcon" alt="user_icon" /> : <img src={this.state.user.image} className="UserIcon" alt="user_icon" />}
            </span>
            <DropdownButton bsStyle="primary" bsSize="large" title={this.state.user.name} id={this.state.user.name} >
              <MenuItem eventKey="2"><Link to="/changepassword">Change Password</Link></MenuItem>
              <MenuItem eventKey="3" onClick={this.logout.bind(this)}>Log Out</MenuItem>
            </DropdownButton>
          </div>

        </div>
      </div>
    );
  }
}
export default Message;
