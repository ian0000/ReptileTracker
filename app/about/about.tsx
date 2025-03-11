import { ISpecies } from "@/logic/types";
import { auth } from "../../database/firebase";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, TextInput } from "react-native-paper";

export default function AboutScreen() {
  const [user, setUser] = useState(null);
  const [specie, setSpecie] = useState<ISpecies>();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace("/signin"); // Redirect to sign-in if not authenticated
      } else {
        console.log(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <View>
      <Card>
        <Card.Content>
          <Text variant="titleLarge">SignIn</Text>
        </Card.Content>
        <Card.Content>
          <TextInput
            placeholder="Species name"
            style={styles.input}
            value="sss"
            onChange={(value) => console.log("dasasd")}
          ></TextInput>
        </Card.Content>
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
});
