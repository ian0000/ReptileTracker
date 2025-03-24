import { collection, CollectionReference, doc, setDoc } from "firebase/firestore";
import { addDocFB, deleteDocFB, getDocFB, getDocsFB, updateDocFB } from "./fbCommon";
import { ISpecies, Reptile, Species } from "./types";
import { db } from "@/database/firebase";

const REPTILES_COLLECTION = "reptiles";

export class ReptileTracker {
  addReptile = async (reptile: Omit<Reptile, "id">): Promise<string> => {
    return addDocFB(collection(db, REPTILES_COLLECTION), reptile);
  };
  getReptiles = async (): Promise<Reptile[]> => {
    return getDocsFB<Reptile>(collection(db, REPTILES_COLLECTION));
  };
  updateReptile = async (reptileId: string, updates: Partial<Omit<Reptile, "id">>) => {
    return updateDocFB(collection(db, REPTILES_COLLECTION), reptileId, updates);
  };
  deleteReptile = async (reptileId: string) => {
    return deleteDocFB(collection(db, REPTILES_COLLECTION), reptileId);
  };
  getReptile = async (reptileId: string): Promise<Reptile> => {
    return getDocFB<Reptile>(collection(db, REPTILES_COLLECTION), reptileId);
  };
}

const SPECIES_COLLECTION = "species";

export class SpeciesManager {
  addSpecies = async (
    specie: ISpecies
  ): Promise<{ status: number; message: string; id?: string }> => {
    const docRef = doc(collection(db, SPECIES_COLLECTION));

    console.log("das" + docRef.id);
    specie.id = docRef.id;
    await setDoc(docRef, specie);
    return {
      status: 1,
      message: "Species added successfully",
      id: docRef.id,
    };
  };
  getSpecies = async (): Promise<(ISpecies & { id: string })[]> => {
    return getDocsFB<ISpecies>(collection(db, SPECIES_COLLECTION) as CollectionReference<ISpecies>);
  };

  updateSpecies = async (speciesId: string, updates: Species) => {
    return updateDocFB(collection(db, SPECIES_COLLECTION), speciesId, updates);
  };
}
