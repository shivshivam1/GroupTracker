const express = require('express')
const User = require('../models/userModel.js')
const Group = require('../models/groupModel.js');
const { updateOne } = require('../models/userModel.js');


const router = express.Router();

router.post('/details', async (req, res) => {
    try {  
        const group = await Group.findOne({
            _id: req.body._id
          })
          
          return res.send(group);

    } catch (error) {
      console.log(error);
      return res.send(error);
    }
          
  });




router.post('/create', async (req, res) => {
    try {  
          const user = await User.findOne({
            _id: req.body._id,
          });
          const groupId = Math.random().toString(36).slice(2, 10);
          const memb = [];
          memb.push(
              {
                  "userId":user._id,
                  "name":user.name,
                  "email":user.email
              }
          );
          const newGroup = new Group({
                groupId:groupId,
                name:req.body.name,
                members:memb
            });

            const savedGroup = await newGroup.save();
            user.groups.push(savedGroup);
            await user.save();
            res.send({
                "flag":true,
                groupId,
                savedGroup
            })

    } catch (error) {
      console.log(error);
      return res.send(error);
    }
          
  });


  router.post('/join', async (req, res) => {
    try {  
          const user = await User.findOne({
            _id: req.body._id,
          });

          const group = await Group.findOne({
            groupId: req.body.groupId
          })
          const memb = {
                  "userId":user._id,
                  "name":user.name,
                  "email":user.email
              }
            group.members.push(memb);
            const savedGroup = await group.save();
            user.groups.push(savedGroup);
            await user.save();
            res.send({
                "flag":true,
                savedGroup
            })

    } catch (error) {
      console.log(error);
      return res.send(error);
    }
          
  });

  router.post('/track', async (req, res) => {
    try {  
        console.log("req body location",req.body.location);
          const user = await User.findOne({
            _id: req.body._id,
          });

          if(user && req.body.location){
            user.longitude = req.body.location.longitude;
            user.latitude = req.body.location.latitude;
          }
         

          const updatedUser = await user.save();

          console.log(updatedUser)
          const long1 = updatedUser.longitude;
          const lat1 = updatedUser.latitude;
          //get details
          const distances = [];
          let alarm = false;
          const members = req.body.group.members;
          for (let i = 0; i < members.length; i++) {
            const memb = await User.findOne({
                _id: members[i].userId,
              });

            const long2 = memb.longitude;
            const lat2 = memb.latitude;
            console.log(lat1,long1,lat2,long2);
            //distance calculation
            const R = 6371e3; // metres
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (long2-long1) * Math.PI/180;
            
            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            
            const d = R * c; // in metres
            console.log("d",d);

            let far = false;
            if(d>req.body.safetyDistance){
                far=true;
                alarm=true;
            }
            const dist = {
                name:memb.name,
                distance:d,
                far:far
            }
            distances.push(dist);    
          }

          return res.send({alarm,distances});

    } catch (error) {
      console.log(error);
      return res.send(error);
    }
          
  });





    module.exports = router; 