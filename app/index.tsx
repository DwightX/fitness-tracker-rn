import {Text, View, StyleSheet, KeyboardAvoidingView, Button, TextInput, ActivityIndicator } from "react-native"
import { useState } from "react"
import auth from '@react-native-firebase/auth'
import {FirebaseError} from 'firebase/app'

export default function Index(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const signUp = async () => {
        setLoading(true);
        try {
            await auth().createUserWithEmailAndPassword(email,password);
            alert("check your email");
        }catch (e:any){
            const err = e as FirebaseError;
            alert('Registration failed: ' + err.message)
        }finally{
            setLoading(false)
        }
    }

    const signIn = async () => {
        setLoading(true);
        try {
            await auth().signInWithEmailAndPassword(email,password);
        }catch (e:any){
            const err = e as FirebaseError;
            alert('Sign in failed: ' + err.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <View style={styles.container} >
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="Email"
                />
                <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Password"
                />
                {loading ?(
                    <ActivityIndicator size={'small'} style={{margin:28}} />
                ) : (
                    <>
                <Button onPress={signIn} title="Sign In" />
                <Button onPress={signUp} title="Sign Up" />
                </>
                )}
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        marginHorizontal:20
    },
    input:{
        marginVertical:4,
        height:50,
        borderWidth:1,
        borderRadius:4,
        padding:10,
        backgroundColor:'#fff',
    }
})