import { Text, View, StyleSheet, KeyboardAvoidingView, Button, TextInput } from "react-native";
import { useState } from "react";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signUp = async () => {
    setLoading(true);
  };
  const signIn = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
      router.push("/about");
    } catch (error) {
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
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email"
        ></TextInput>
        <TextInput value={password} onChangeText={setPassword} placeholder="password"></TextInput>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Button onPress={signUp} title="Login" />
            <Button onPress={signIn} title="Sign Up" />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
