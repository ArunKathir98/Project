import React, { Component } from 'react'
import '../Css/Message.css';

class privateChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privatemessage: '',
    }

    this.privateMessage = (e) => {
      e.preventDefault();
      this.setState({ privatemessage: e.target.value })
    }

  }
  render() {
    return (
      
      
      <div className="Container">
        <div>
          {/* <a className="closebutton" href="javascript:window.open('','_self').close();">X</a> */}
        </div>
        <div className="MessageList">
          <div className="MyMessage">
         </div>
          <div className="TextMessage">
          </div>
        </div>
        <div className="ChatBox">
          <form id="message-form" >
            <input type="text" id="privatemessage" className="PrivateMessageBox" placeholder="Write your message here..." value={this.state.privatemessage} onChange={this.privateMessage} />
            <input type="submit" className="btn btn-primary btn-sm Send" value="Send" />
          </form>
        </div>
      </div>
    )
  }
}
export default privateChat;
