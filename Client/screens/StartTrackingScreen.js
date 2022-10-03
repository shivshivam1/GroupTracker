import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Input, Button} from 'react-native-elements';
import axios from 'axios';

const StartTrackingScreen = ({navigation, route}) => {
    const user = route.params.user;
    const group = route.params.group
    const [safetyDistance, setSafetyDistance] = useState('');
    const goHome = ()=>{
      axios.post('http://192.168.29.196:5000/api/user/getuser',{
          email:user.email
      })
        .then(function (response) {
          navigation.replace("Home", {user:response.data})
        })
        .catch(function (error) {
          console.log(error);
        })
      
  }
    const StartTracking=()=>{
      navigation.replace("Tracking",{
        user:user,
        group:group,
        safetyDistance:safetyDistance
      })
    }


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{group.name} {"\n"}</Text>
            <Input
                placeholder='Enter Safety Distance'
                label='Safety Distance'
                // leftIcon={{ type: 'material', name: 'name' }}
                value={safetyDistance}
                onChangeText={text => setSafetyDistance(text)}
            />
            <Button title="Start Tracking" style={styles.button} onPress= {StartTracking}/>
            <Text style={styles.secondText}>{"\n"}{"\n"}Members</Text>
            {group.members.map((member) => {
                return (
                <View>
                    <Text style={styles.item}>{member.name}</Text>
                </View>
                );
            })}
            <Text>{"\n"}</Text>
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
    },
    item: {
        padding: 10,
        fontSize: 15,
        marginTop: 10,
      },
    titleText: {
      fontSize: 40,
      fontWeight: "bold",
      textDecorationLine: 'underline'
    },
    secondText: {
      fontSize: 20,
      fontWeight: "bold",
      textDecorationLine: 'underline'
    }
})

export default StartTrackingScreen;