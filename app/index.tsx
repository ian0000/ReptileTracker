import { View, StyleSheet, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import { useState } from "react";
import { auth } from "@/database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";
import { navigate } from "expo-router/build/global-state/routing";
import { handleFireBaseError } from "./signin";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signUp = async () => {
    setLoading(true);
    router.push("/signin");
    setLoading(false);
  };
  const signIn = async () => {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push("/about/about");
        })
        .catch((error) => {
          Alert.alert(handleFireBaseError(error.code));
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding">
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Login</Text>
            <Avatar.Icon style={[styles.mainicon]} size={250} icon={"youtube-gaming"}></Avatar.Icon>
          </Card.Content>
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              style={styles.input}
            ></TextInput>
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              placeholder="Password"
              style={styles.input}
            ></TextInput>
          </Card.Content>
          {loading ? (
            <Text variant="titleMedium">Loading...</Text>
          ) : (
            <Card.Actions style={styles.div}>
              <Button icon="youtube-gaming" mode="contained" style={styles.button} onPress={signIn}>
                Login
              </Button>
              <Button icon="account-plus" mode="contained" style={styles.button} onPress={signUp}>
                Sign Up
              </Button>
            </Card.Actions>
          )}
        </Card>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    minWidth: 100,
  },
  div: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  mainicon: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
});
