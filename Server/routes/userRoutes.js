const express = require('express')
const User = require('../models/userModel.js')
const { getToken, isAuth } = require('../util.js')
const bcrypt = require('bcryptjs')
const compareSync = require('bcryptjs')

const bcryptsalt = 8;

const router = express.Router();

router.post('/getuser', async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        res.send(user);
      }
        return res.status(401).send({ message: 'Invalid Email or Password.' });
    
  } catch (error) {
      return res.send(error);
  }
    
  });



router.post('/register', async (req, res) => {
    try {
      
          const registerUser = await User.findOne({
            email: req.body.email,
          });

          console.log("dsfsdf",registerUser);
          if(!registerUser){ 
                const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                mobile:req.body.mobile,
                longitude:0,
                latitude:0,
                });
    
            const newUser = await user.save();

                if (newUser) {
                    return res.send({
                    flag:true,
                    user:newUser,
                    });
                } else {
                    return res.status(401).send({ message: 'Invalid User Data.' });
                }
            }
            else {
            return res.status(401).send({ message: 'User Email-Id Already Exist' });
            }
      
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
          
  });


  router.post('/signin', async (req, res) => {
    try {
        const signinUser = await User.findOne({ email: req.body.email });
        if (signinUser) {
          if (bcrypt.compareSync(req.body.password, signinUser.password)) {          
            return res.send({
              flag:true,
              user:signinUser
            });
          }
        }
          return res.status(401).send({ message: 'Invalid Email or Password.' });
      
    } catch (error) {
        return res.send(error);
    }
      
    });


    router.post('/savelocation', async (req, res) => {
      try {
        // console.log("hetre")
          const user = await User.findOne({ email: req.body.email });
          user.longitude = req.body.location.longitude;
          user.latitude = req.body.location.latitude;
          const updatedUser = await user.save();
          // console.log(updatedUser);
          return res.send(updatedUser);

      } catch (error) {
          return res.send(error);
      }
        
      });


    module.exports = router; 