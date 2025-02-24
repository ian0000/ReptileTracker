import { View, StyleSheet, Alert } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { useCallback, useState } from "react";
import { addUser, getUsers } from "@/logic/firestore";
import { IUser } from "@/logic/types";

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
      if (!validateForm()) {
        return;
      }
      const newUserID = await addUser({
        name: state.name,
        email: state.email,
        creationDate: new Date().toISOString(),
        password: state.password,
      });
      setState({
        name: "",
        email: "",
        creationDate: "",
        password: "",
        password2: "",
      });
      fetchUsers;
      console.log("User added with ID:", newUserID);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    const users = await getUsers();
    console.log(users);
  };

  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text style={styles.text}>Sign In</Text>
        <View>
          <TextInput
            label="User"
            placeholder="User"
            style={styles.text}
            onChange={(value) => handleChangeText("name", value.nativeEvent.text)}
          ></TextInput>
          <TextInput
            label="Email"
            placeholder="Email"
            style={styles.text}
            onChange={(value) => handleChangeText("email", value.nativeEvent.text)}
          ></TextInput>
          <TextInput
            label="Password"
            placeholder="Password"
            style={styles.text}
            onChange={(value) => handleChangeText("password", value.nativeEvent.text)}
          ></TextInput>
          <TextInput
            label="Password2"
            placeholder="Password2"
            style={styles.text}
            onChange={(value) => handleChangeText("password2", value.nativeEvent.text)}
          ></TextInput>
          <Button onPress={() => createNewUser()}>Save</Button>
          <Button onPress={() => fetchUsers()}>get</Button>
        </View>
      </Card.Content>
    </Card>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
