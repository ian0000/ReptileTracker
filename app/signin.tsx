import { View, StyleSheet, Alert, Text, TextInput, Button, Pressable } from "react-native";

import { useCallback, useState } from "react";
import { addUser, getUsers } from "@/logic/userControl";
import { IUser } from "@/logic/types";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/database/firebase";

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
      console.log(state);
      if (!validateForm()) {
        return;
      }
      var res = await createUserWithEmailAndPassword(auth, state.email, state.password)
        .then((userCredential) => async () => {
          // Signed in
          // var user = userCredential.user;
          // ...

          console.log(userCredential);
          console.log("User created");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          Alert.alert(errorMessage);
        });
      console.log(res);
      if (res == undefined) {
        return;
      }
      const newUserID = await addUser({
        name: state.name,
        email: state.email,
        creationDate: new Date().toISOString(),
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
    <View style={styles.container}>
      <Text style={styles.text}>Sign In</Text>
      <View>
        <TextInput
          placeholder="User"
          style={styles.text}
          value={state.name}
          onChange={(value) => handleChangeText("name", value.nativeEvent.text)}
        ></TextInput>
        <TextInput
          placeholder="Email"
          style={styles.text}
          value={state.email}
          onChange={(value) => handleChangeText("email", value.nativeEvent.text)}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.text}
          value={state.password}
          secureTextEntry={true}
          onChange={(value) => handleChangeText("password", value.nativeEvent.text)}
        ></TextInput>
        <TextInput
          placeholder="Password2"
          style={styles.text}
          value={state.password2}
          secureTextEntry={true}
          onChange={(value) => handleChangeText("password2", value.nativeEvent.text)}
        ></TextInput>
        <Pressable onPress={() => createNewUser()}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable onPress={() => fetchUsers()}>
          <Text style={styles.buttonText}>Get</Text>
        </Pressable>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
    minWidth: 300,
    maxWidth: 300,
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
