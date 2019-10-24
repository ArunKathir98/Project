import React, { Component } from 'react';
import Login from './Login';
import io from "socket.io-client";
import Message from './Messenger';
const socketUrl = ('http://172.24.125.244:5000');

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      userConnected: null,
    }
  }
  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', (socket) => {
      console.log(socket.id);
      console.log("connected");
    })
    this.setState({ socket })
  }
  componentWillMount() {
    this.initSocket();
  }
  render() {
    const { socket } = this.state
    return (
      <div>
        {localStorage.getItem("user") == null ? <Login socket={socket} /> : <Message socket={socket} />}
      </div>
    );
  }
}

export default Layout;
