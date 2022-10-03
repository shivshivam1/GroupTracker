import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Input, Button} from 'react-native-elements';
import useLocation from "../hooks/useLocation";
 
const HomeScreen = ({navigation, route})=> {
 
  const [location, setLocation] = useState({});
  const loc = useLocation();
  const user = route.params.user;
 
  const createGrp=()=>{
    navigation.replace("CreateGroup",{user:user})
  }
 
  const joinGrp=()=>{
    navigation.replace("JoinGroup",{user:user})
  }

  const enterGrp=(group)=>{
    axios.post('http://192.168.240.223:5000/api/group/details',{
            _id:group._id
        })
          .then(function (response) {
              navigation.replace("StartTracking",{user:user,group:response.data});
          })
          .catch(function (error) {
            console.log(error);
          })
  }
 
  useEffect(() => {
    setLocation(loc);
    setInterval(function(){ 
      setLocation(loc);
  }, 5000);
  });
 
  const [lattitude, setLattitude] = useState('');
  const [longitude, setLongitude] = useState('');

 
  return (
 
 
    <View style={styles.container}>
      <View style={styles.description}>
        <Text style={styles.descriptionContent1}>
          {user.name}
        </Text>
        <Text style={styles.descriptionContent2}>
          Your Coordinates : {JSON.stringify(location)}
        </Text>
      </View>
 
      <View style = {styles.options}>
        <Button title="Create Group" style={styles.button} onPress={createGrp}/>
        <Button title="Join Group" style={styles.button} onPress={joinGrp} />
      </View>
 
      <View style={styles.heading}>
        <Text style={styles.descriptionContent1}>
          My Groups
        </Text>
      </View>
 
      {
        user.groups.map((group) => {
          return (
          <View 
          style={{flexDirection: 'row',
          padding: 20,
          fontSize: 15,
          marginTop: 5,
          justifyContent: 'center',
          alignItems: 'center'
          }}>
              <Text style={{flex:3}} >{group.name}</Text> 
              <Button title="Enter" style={styles.segment} onPress={()=>enterGrp(group)}></Button>
          </View>
          );
      })}
 
      <StatusBar style="auto" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
  },
  description: {
    marginLeft: '4%',
    fontSize: 15,
    marginBottom: '5%',
  },
  heading: {
    marginTop: '5%',
    marginLeft: '4%',
    fontSize: 15,
    marginBottom: '5%',
  },
  descriptionContent1: {
    fontSize: 30
  },
  descriptionContent2: {
    fontSize: 15
  },
  options: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    // width: "30%",
    marginTop: 10,
  },
  button: {
    padding: "5%" 
  },
  segment: {
    flex:1,
    
  }
});
 
export default HomeScreen