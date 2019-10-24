const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('../models/user');

router.get('/',(req,res,next) => {
  user.find().exec()
  .then(doc => {
      res.status(200).json(doc);
  })
  .catch(err => {
      res.status(500).json({error:err});
  });
});
router.get('/:id',(req,res,next) => {
  const _id=req.params.id;
  user.findById(_id).exec()
  .then(doc => {
      res.status(200).json(doc);
  })
  .catch(err => {
    res.status(500).json({error:err});
  });
});

router.post('/',(req,res,next) => {
  user.find({email:req.body.email})
  .exec()
  .then(userDetails => {
    if(userDetails.length==0) {
      const userDetails = new user({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword,
        securityQuestion:req.body.securityQuestion,
      });
      userDetails.save().then(result => {
        res.status(200).json(userDetails);
      });
    } else {
      return res.status(409).json({
        message:"Mail Exists"
      });
    }
  })
  .catch(err => {
    return res.status(500).json({
      message:"Invalid Data"
    });
  });
});

router.put('/changepassword/:userId',(req,res,next) => {
  const id = req.params.userId;
  user.find({_id:id})
  .exec()
  .then(data => {
    if(data[0].password == req.body.oldPassword) {
      user.findOneAndUpdate({_id:id},{password:req.body.newPassword,confirmPassword:req.body.confirmPassword})
      .then(result => {
        res.status(200).json(result)
      });
    } else {
      return res.status(500).json({
        message:"Incorrect old password"
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      error:error,
    })
  });
});

router.put('/forgotpassword/:email',(req,res,next) => {
  const email = req.params.email;
  user.find({email:email})
  .exec()
  .then(data => {
    if(data[0].securityQuestion == req.body.securityQuestion) {
      user.findOneAndUpdate({email:email},{password:req.body.newPassword,confirmPassword:req.body.confirmPassword})
      .then(result => {
        res.status(200).json(result)
      });
    } else {
      return res.status(500).json({
        message:"Incorrect Security Answer"
      });
    }
  })
  .catch(error => {
    res.status(500).json({
      error:error,
    })
  });
});


router.delete('/:userId',(req,res,next) =>{
  const id=req.params.userId;
  user.remove({_id:id}).exec()
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
