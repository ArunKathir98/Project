const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const message = require('../models/message');
const moment = require('moment');

router.get('/',(req,res,next) => {
  message.find().sort({time: 1}).exec()
  .then(data => {
    const messageList = [];
    data.map(data => {
      if(messageList.indexOf(messageList._id)==-1) {
        messageList.push({
          _id:data._id,
          senderName: data.senderName,
          message: data.message,
          time: moment(data.time).format('h:mm:ss a'),
        });
      }
    })
    res.status(200).json({
      messageList
    });
  })
  .catch(err => {
      res.status(500).json({error:err});
  });
});

router.post('/',(req,res,next) => {
  const messageDetails = new message({
    _id:new mongoose.Types.ObjectId(),
    senderName:req.body.name,
    message:req.body.message,
    time:req.body.time,
  });
  messageDetails.save().then(result => {
    res.status(200).json(result);
  })
  .catch(error => {
    res.status(500).json(error);
  });
});
router.delete('/:id',(req,res,next) => {
  const id=req.params.id;
  message.remove({_id:id}).exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
      res.status(500).json({
      error:err
    });
  });
});

module.exports = router;
