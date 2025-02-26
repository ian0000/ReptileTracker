import { collection } from "firebase/firestore";
import { addDocFB, deleteDocFB, getDocFB, getDocsFB, updateDocFB } from "./fbCommon";
import { Reptile } from "./types";
import { db } from "@/database/firebase";

const REPLTILES_COLLECTION = "reptiles";

export class ReptileTracker {
  addReptile = async (reptile: Omit<Reptile, "id">): Promise<string> => {
    return addDocFB(collection(db, REPLTILES_COLLECTION), reptile);
  };
  getReptiles = async (): Promise<Reptile[]> => {
    return getDocsFB<Reptile>(collection(db, REPLTILES_COLLECTION));
  };
  updateReptile = async (reptileId: string, updates: Partial<Omit<Reptile, "id">>) => {
    return updateDocFB(collection(db, REPLTILES_COLLECTION), updates);
  };
  deleteReptile = async (reptileId: string) => {
    return deleteDocFB(collection(db, REPLTILES_COLLECTION), reptileId);
  };
  getReptile = async (reptileId: string): Promise<Reptile> => {
    return getDocFB<Reptile>(collection(db, REPLTILES_COLLECTION), reptileId);
  };
}
