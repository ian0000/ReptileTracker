import { Text, View, StyleSheet, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import { useState } from "react";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { Button, TextInput } from "react-native-paper";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signUp = async () => {
    setLoading(true);
    setLoading(false);
  };
  const signIn = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Signed in successfully!");
    } catch (error) {
      Alert.alert(error + "");
      console.log(error);
    }
    setLoading(false);
    // try {
    //   await auth().signInWithEmailAndPassword(email, password);
    // } catch (e: any) {
    //   const error = e as FirebaseError;
    //   alert(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          style={style.input}
        ></TextInput>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={style.input}
        ></TextInput>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={style.div}>
            <Button icon="" mode="contained" style={style.button} onPress={signIn}>
              Login
            </Button>
            <Button icon="" mode="contained" style={style.button} onPress={signUp}>
              Sign Up
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const style = StyleSheet.create({
  input: {
    height: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignContent: "center",
    alignItems: "center",
    minWidth: 200,
  },
  div: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
