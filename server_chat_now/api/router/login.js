const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/user');
var userData = [];

router.get('/',(req,res,next) => {
  res.status(200).json(userData);
});

router.get('/:_id',(req,res,next) => {
  const _id = req.params._id;
  user.findById(_id).exec()
  .then(userDetails => {
    res.status(200).json(userDetails);
  })
  .catch(err => {
    res.status(500).json({error:err});
  });
});

router.post('/',(req,res,next) => {
  user.find({email:req.body.email,password:req.body.password})
  .exec()
  .then(userDetails => {
    userDetails.map(detail =>{
      if(userData.indexOf(detail.name)== -1) {
        userData.push(detail.name);
      }
    })
    res.status(200).json(userDetails)
  })
  .catch(error => {
    userData = [];
    res.status(500).json({
      message:"Invalid User"
    });
  });
});

router.delete('/:name',(req,res,next) => {
  const username = req.params.name;
  userData.splice(userData.indexOf(username),1);
  res.status(200).json(userData);
});
module.exports = router;
