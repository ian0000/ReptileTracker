import { View, StyleSheet, Alert } from "react-native";

import { useCallback, useState } from "react";
import { addUser, getUsers } from "@/logic/userControl";
import { IUser } from "@/logic/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase";
import { Avatar, Button, Card, Text, TextInput } from "react-native-paper";

interface FormState extends IUser {
  password2: string;
}

export default function SignIn() {
  const [state, setState] = useState<Omit<FormState, "id">>({
    name: "",
    email: "",
    creationDate: "",
    password: "",
    password2: "",
    referenceID: "",
    status: 0,
  });

  const handleChangeText = useCallback((name: keyof Omit<FormState, "id">, value: string) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  const validateForm = (): boolean => {
    if (
      !state.name.trim() ||
      !state.email.trim() ||
      !state.password.trim() ||
      !state.password2.trim()
    ) {
      Alert.alert("Please fill all fields");
      return false;
    }
    if (state.password !== state.password2) {
      Alert.alert("Passwords do not match");
      return false;
    }
    return true;
  };
  const createNewUser = async () => {
    try {
      if (!validateForm()) {
        return;
      }
      var res = await createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((userCredential) => async () => {
          // Signed in
          // var user = userCredential.user;
          // ...
          Alert.alert("Success", "User created");
        })
        .catch((error) => {
          Alert.alert(handleFireBaseError(error.code));
        });
      if (res == undefined) {
        return;
      }
      const newUserID = await addUser({
        name: state.name,
        email: state.email,
        creationDate: new Date().toISOString(),
        referenceID: state.referenceID,
        status: state.status,
      });
      Alert.alert(newUserID.message);
      if (newUserID.status == 0) {
        return;
      }
      setState({
        name: "",
        email: "",
        creationDate: "",
        password: "",
        password2: "",
        referenceID: "",
        status: 1,
      });
      fetchUsers;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    const users = await getUsers();
    console.log(users);
  };

  return (
    <View>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">SignIn</Text>
          <Avatar.Icon style={[styles.mainicon]} size={200} icon={"account-settings"}></Avatar.Icon>
        </Card.Content>
        <Card.Content>
          <TextInput
            label="User"
            placeholder="User"
            style={styles.input}
            value={state.name}
            onChange={(value) => handleChangeText("name", value.nativeEvent.text)}
          ></TextInput>
          <TextInput
            label="Email"
            placeholder="Email"
            style={styles.input}
            value={state.email}
            onChange={(value) => handleChangeText("email", value.nativeEvent.text)}
          ></TextInput>
          <TextInput
            label="Password"
            placeholder="Password"
            style={styles.input}
            value={state.password}
            secureTextEntry={true}
            onChange={(value) => handleChangeText("password", value.nativeEvent.text)}
          ></TextInput>
          <TextInput
            label="Repeat Password"
            placeholder="Password2"
            style={styles.input}
            value={state.password2}
            secureTextEntry={true}
            onChange={(value) => handleChangeText("password2", value.nativeEvent.text)}
          ></TextInput>
        </Card.Content>
        <Card.Actions style={styles.div}>
          <Button
            icon="account"
            mode="contained"
            style={styles.button}
            onPress={() => createNewUser()}
          >
            Save
          </Button>
          <Button
            icon="account"
            mode="contained"
            style={styles.button}
            onPress={() => fetchUsers()}
          >
            Get
          </Button>
        </Card.Actions>
      </Card>
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

export const handleFireBaseError = (code: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email format. Please enter a valid email.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already in use. Try logging in.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";
    case "auth/invalid-credential":
      return "Wrong credentials.";
    default:
      return "An unknown error occurred. Please try again.";
  }
};
