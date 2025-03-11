import { collection } from "firebase/firestore";
import { addDocFB, deleteDocFB, getDocFB, getDocsFB, updateDocFB } from "./fbCommon";
import { Reptile, Species } from "./types";
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
  addSpecies = async (specie: Species): Promise<string> => {
    return addDocFB(collection(db, SPECIES_COLLECTION), specie);
  };
  getSpecies = async (): Promise<Species[]> => {
    return getDocsFB<Species>(collection(db, SPECIES_COLLECTION));
  };
  updateSpecies = async (speciesId: string, updates: Species) => {
    return updateDocFB(collection(db, SPECIES_COLLECTION), speciesId, updates);
  };
}
