import React, {useEffect, useState} from 'react'
import { View, StyleSheet,Text} from 'react-native'
import * as Clipboard from 'expo-clipboard';
import {Input, Button} from 'react-native-elements';
import axios from 'axios';


const CreateGroupScreen = ({navigation,route}) => {

    // console.log(route.params);
    const user = route.params.user;
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState("");

    const goHome = ()=>{
        axios.post('http://192.168.240.223:5000/api/user/getuser',{
            email:user.email
        })
          .then(function (response) {
            navigation.replace("Home", {user:response.data})
          })
          .catch(function (error) {
            console.log(error);
          })
        
    }
    const createGroup = () =>{
        axios.post('http://192.168.29.196:5000/api/group/create',{
            name:groupName,
            _id:user._id
        })
          .then(function (response) {
            if(response.data.flag===true){
                console.log(response.data);
                setGroupId(response.data.groupId);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    
    const copy = () =>{
        Clipboard.setString(groupId);
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter Group Name'
                label='Group Name'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={groupName}
                onChangeText={text => setGroupName(text)}
            />
            <Button title="Create Group" style={styles.button} onPress = {createGroup} />
            {groupId !=="" ? <View style={styles.container}>
            <Text> Group Created Succesfully and You are added to that.{"\n"}
             Send this code to friends to add them in group{"\n"}{"\n"} </Text>
                <Text style={styles.titleText}>{groupId}{"\n"}{"\n"}</Text>
            <Button title="Copy to Clipboard" style={styles.button} onPress = {copy}></Button>
            </View>:null
            }
            <Text>{"\n"}</Text>
            <Button title="<- Back To Home" style={styles.button} onPress = {goHome} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    button: {
        width: 200,
        marginTop: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
      }
})

export default CreateGroupScreen;