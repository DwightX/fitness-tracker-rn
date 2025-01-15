import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    ActivityIndicator,
  } from "react-native";
  import { Stack, useRouter} from "expo-router"
  import { useState } from "react";
  import auth from "@react-native-firebase/auth";
  import { FirebaseError } from "firebase/app";
  import { Button } from "@rneui/base";
  import AnimatedTextInput from "@big-tam/react-native-animated-text-input";

  const lightBlue = "#45A6E5";
  const offWhite = "#e1e1e1";
  
  export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()
  
    const signUp = async () => {
      setLoading(true);
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        alert("Check your email");
      } catch (e: any) {
        const err = e as FirebaseError;
        alert("Registration failed: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    const signIn = async () => {
      router.replace('/')
    };
  
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Tracker</Text>
        </View>
  
        <KeyboardAvoidingView behavior="padding" style={styles.loginWrapper}>
        <AnimatedTextInput
            {...config}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={"Email"}
          />
          <AnimatedTextInput
            {...config}
            placeholder={"Password"}
            secureTextEntry
            onChangeText={setPassword}
          />
          <View style={styles.signInWrapper}>
            <Button 
            buttonStyle={{
                backgroundColor: '#e3b23c',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
                width:300
              }}
              onPress={signUp} title="Sign Up" />
          </View>
          {loading && <ActivityIndicator size="small" style={styles.loadingIndicator} />}
        </KeyboardAvoidingView>
  
        {/* Sign Up button at the bottom */}
        <View style={styles.signUpWrapper}>
          <Button 
                buttonStyle={{
                borderColor: 'transparent',
                borderWidth: 0,
                width:300,
                }}
                type="clear"
                titleStyle={{ color: '#e3b23c'}}
                onPress={signIn} title="Already have an account? Sign In" />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#001029",
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 100,
      color: "white",
    },
    loginWrapper: {
      flex: 1,
      marginVertical: 20,
    },
    label: {
      color: "white",
      marginBottom: 4,
    },
    input: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      backgroundColor: "#fff",
    },
    loadingIndicator: {
      margin: 28,
    },
    signInWrapper: {
      marginTop: 20, // Adds spacing above the "Sign In" button
      alignItems: "center", // Centers the button horizontally
    },
    signUpWrapper: {
      padding: 20,
      alignItems: "center", // Centers the button horizontally
    },
  });
  
  const config = {
    borderColor: lightBlue,
    deleteIconColor: lightBlue,
    backgroundColor: '#001029',
    placeholderTextColor: offWhite,
    color:offWhite,
    containerStyle: {
      margin: 5,
    },
  };