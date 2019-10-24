const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  senderName: {
    type:String
  },
  message:{
    type:String
  },
  time:{
    type:Date
  }
});

module.exports = mongoose.model('message',messageSchema);
