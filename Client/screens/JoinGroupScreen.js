import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Input, Button} from 'react-native-elements';
import axios from 'axios';


const JoinGroupScreen = ({navigation,route}) => {

    const user = route.params.user;
    const [groupCode, setGroupCode] = useState('');
    const [flag, setFlag] = useState(false)
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
    const joinGroup = () =>{
        axios.post('http://192.168.29.196:5000/api/group/join',{
            groupId:groupCode,
            _id:user._id
        })
          .then(function (response) {
            if(response.data.flag===true){
                console.log(response.data);
                setFlag(true);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter Group Code'
                label='Group Code'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={groupCode}
                onChangeText={text => setGroupCode(text)}
            />
            <Button title="Join Group" style={styles.button} onPress = {joinGroup} />
            {flag == true ? <View style={styles.container}>
                <Text> Joined Group Succesfully</Text>
            </View>:null}
            <Text>{"\n"}</Text>
            <Button title="Back To Home" style={styles.button} onPress = {goHome} />

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
    }
})

export default JoinGroupScreen;