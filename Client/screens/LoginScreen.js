import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {Input, Button} from 'react-native-elements';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        axios.post('http://192.168.240.223:5000/api/user/signin',{
            email,password
        })
          .then(function (response) {
            if(response.data.flag===true){
                navigation.replace('Home',{user: response.data.user});
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged
    //     (function (user) {
    //         if (user) {
    //             navigation.replace('Chat');
    //         } 
    //         else {
    //             navigation.canGoBack() &&
    //             navigation.popToTop();
    //         // No user is signed in.
    //         }
    //         });
    //         return unsubscribe;
    //     }, []
    // )
    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title="login" style={styles.button} onPress = {signIn} />
            <Text>{"\n"}</Text>
            <Button title="register" style={styles.button} onPress= {()=>navigation.navigate('Register')}/>
        </View>
    )
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

export default LoginScreen