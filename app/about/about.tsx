import { ISpecies, Species } from "@/logic/types";
import { auth } from "../../database/firebase";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import { Appbar, Button, Card, DataTable, Text, TextInput } from "react-native-paper";
import { SpeciesManager } from "@/logic/reptileControl";

const speciesManager = new SpeciesManager();

const MyHeader = () => {
  return (
    <Appbar.Header>
      <Appbar.Content title="title"></Appbar.Content>
    </Appbar.Header>
  );
};

interface FormSpecies extends ISpecies {}

export const GetSpecies = async (): Promise<ISpecies[]> => {
  const speciesList = await speciesManager.getSpecies();
  return speciesList;
};
export default function AboutScreen() {
  const [user, setUser] = useState(null);
  const [specie, setSpecie] = useState<FormSpecies>({
    id: "1r",
    name: "",
    description: "",
    creationDate: "",
    state: 1,
  });
  const router = useRouter();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (!currentUser) {
  //       router.replace("/signin"); // Redirect to sign-in if not authenticated
  //     } else {
  //       console.log(currentUser);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  const handleChangeText = useCallback((name: keyof Omit<FormSpecies, "id">, value: string) => {
    setSpecie((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateFormSpecies = (): boolean => {
    if (!specie.name.trim() || !specie.description.trim()) {
      Alert.alert("There are empty fields.");
      return false;
    }
    return true;
  };

  const createNewSpecie = async () => {
    try {
      if (!validateFormSpecies()) {
        return;
      }
      const newSpecieID = await speciesManager.addSpecies({
        id: specie.id,
        name: specie.name,
        description: specie.description,
        creationDate: new Date().toISOString(),
        state: specie.state,
      });
      Alert.alert(newSpecieID.message);
      if (newSpecieID.status == 0) {
        return;
      }
      setSpecie({
        id: "1",
        name: "",
        description: "",
        creationDate: "",
        state: 1,
      });
      GetSpecies();
    } catch (error) {
      console.log(error);
    }
  };
  const [specieList, setSpecieList] = useState<ISpecies[]>([]);

  useEffect(() => {
    GetSpecies().then((species) => setSpecieList(species));
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <MyHeader />
      <KeyboardAvoidingView behavior="padding">
        <Card>
          <Card.Content>
            <Text variant="titleLarge">SignIn</Text>
          </Card.Content>
          <Card.Content>
            <TextInput
              label="Species name"
              placeholder="Species name"
              style={styles.input}
              value={specie.name}
              onChange={(value) => handleChangeText("name", value.nativeEvent.text)}
            ></TextInput>
            <TextInput
              label="Description"
              placeholder="Description"
              style={styles.input}
              value={specie.description}
              onChange={(value) => handleChangeText("description", value.nativeEvent.text)}
            ></TextInput>
          </Card.Content>
          <Card.Actions style={styles.div}>
            <Button
              icon={""}
              mode="contained"
              style={styles.button}
              onPress={() => {
                createNewSpecie();
              }}
            >
              Save
            </Button>
          </Card.Actions>
        </Card>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Specie</DataTable.Title>
          </DataTable.Header>
          {specieList.length > 0 ? (
            specieList.map((species) => (
              <DataTable.Row key={species.id}>
                <DataTable.Cell>{species.id}</DataTable.Cell>
                <DataTable.Cell>{species.name}</DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell>No species found</DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>
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
});
