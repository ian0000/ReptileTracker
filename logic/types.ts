export interface IUser {
  id: string;
  name: string;
  email: string;
  creationDate: string;
  password: string;
  referenceID: string;
  status: number;
}

export class User {
  static fromFirestore(data: any): Omit<IUser, "password"> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      creationDate: data.creationDate,
      referenceID: data.referenceID,
      status: data.status,
    };
  }
}

export interface IReptile {
  id: string;
  name: string;
  sex: boolean;
  birthDate: string;
  age: number;
  tag: string;
  parent1Id?: string;
  parent2Id?: string;
  creationDate: string;
  userId: string;
  speciesId: string;
  isAlive: boolean;
  deathDate?: string;
}

export class Reptile {
  static fromFirestore(data: any): Omit<IReptile, "id"> {
    return {
      name: data.name,
      sex: data.sex,
      birthDate: data.birthDate,
      age: data.age,
      tag: data.tag,
      parent1Id: data.parent1Id, //can this be null?
      parent2Id: data.parent2Id,
      creationDate: data.creationDate,
      userId: data.userId,
      speciesId: data.speciesId,
      isAlive: data.isAlive,
      deathDate: data.deathDate,
    };
  }
}

export interface ISpecies {
  id: string;
  name: string;
  description: string;
  creationDate: string;
  state: number;
}

export class Species {
  static fromFirestore(data: any): Omit<ISpecies, "id"> {
    return {
      name: data.name,
      description: data.description,
      creationDate: data.creationDate,
      state: data.state,
    };
  }
}

export interface IFoodType {
  id: string;
  name: string;
  creationDate: string;
}

export class FoodType {
  static fromFirestore(data: any): Omit<IFoodType, "id"> {
    return {
      name: data.name,
      creationDate: data.creationDate,
    };
  }
}

export interface ISupplementType {
  id: string;
  name: string;
  creationDate: string;
}

export class SupplementType {
  static fromFirestore(data: any): Omit<ISupplementType, "id"> {
    return {
      name: data.name,
      creationDate: data.creationDate,
    };
  }
}

export interface Behavior {
  id: string;
  name: string;
  description: string;
  creationDate: string;
  userId: string;
  feedingId: string;
}

export class Behavior {
  static fromFirestore(data: any): Omit<Behavior, "id"> {
    return {
      name: data.name,
      description: data.description,
      creationDate: data.creationDate,
      userId: data.userId,
      feedingId: data.feedingId,
    };
  }
}

export interface IFeeding {
  id: string;
  date: string;
  foodTypeId: string;
  foodAmount: number;
  supplementTypeId: string;
  supplementAmount: number;
  reptileId: string;
  userId: string;
  creationDate: string;
}

export class Feeding {
  static fromFirestore(data: any): Omit<IFeeding, "id"> {
    return {
      date: data.date,
      foodTypeId: data.foodTypeId,
      foodAmount: data.foodAmount,
      supplementTypeId: data.supplementTypeId,
      supplementAmount: data.supplementAmount,
      reptileId: data.reptileId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IShedding {
  id: string;
  date: string;
  reptileId: string;
  userId: string;
  creationDate: string;
  observation: string;
}

export class Shedding {
  static fromFirestore(data: any): Omit<IShedding, "id"> {
    return {
      date: data.date,
      reptileId: data.reptileId,
      userId: data.userId,
      creationDate: data.creationDate,
      observation: data.observation,
    };
  }
}

export interface IMating {
  id: string;
  date: string;
  maleId: string;
  femaleId: string;
  userId: string;
  creationDate: string;
}

export class Mating {
  static fromFirestore(data: any): Omit<IMating, "id"> {
    return {
      date: data.date,
      maleId: data.maleId,
      femaleId: data.femaleId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IClutch {
  id: string;
  date: string;
  number: number;
  fertile: number;
  infertile: number;
  slug: number;
  hatchlings: number;
  userId: string;
  creationDate: string;
  matingId: string;
}

export class Clutch {
  static fromFirestore(data: any): Omit<IClutch, "id"> {
    return {
      date: data.date,
      number: data.number,
      fertile: data.fertile,
      infertile: data.infertile,
      slug: data.slug,
      hatchlings: data.hatchlings,
      userId: data.userId,
      creationDate: data.creationDate,
      matingId: data.matingId,
    };
  }
}
export interface IIncubation {
  id: string;
  date: string;
  temperature: number;
  humidity: number;
  userId: string;
  creationDate: string;
  clutchId: string;
}

export class Incubation {
  static fromFirestore(data: any): Omit<IIncubation, "id"> {
    return {
      date: data.date,
      temperature: data.temperature,
      humidity: data.humidity,
      userId: data.userId,
      creationDate: data.creationDate,
      clutchId: data.clutchId,
    };
  }
}

export interface IHealth {
  id: string;
  date: string;
  weight: number;
  length: number;
  reptileId: string;
  userId: string;
  creationDate: string;
}

export class Health {
  static fromFirestore(data: any): Omit<IHealth, "id"> {
    return {
      date: data.date,
      weight: data.weight,
      length: data.length,
      reptileId: data.reptileId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReminder {
  id: string;
  name: string;
  description: string;
  date: string;
  userId: string;
  creationDate: string;
}

export class Reminder {
  static fromFirestore(data: any): Omit<IReminder, "id"> {
    return {
      name: data.name,
      description: data.description,
      date: data.date,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface ILog {
  id: string;
  date: string;
  userId: string;
  creationDate: string;
  type: string;
  description: string;
}

export class Log {
  static fromFirestore(data: any): Omit<ILog, "id"> {
    return {
      date: data.date,
      userId: data.userId,
      creationDate: data.creationDate,
      type: data.type,
      description: data.description,
    };
  }
}

export interface ITask {
  id: string;
  name: string;
  description: string;
  date: string;
  userId: string;
  creationDate: string;
}

export class Task {
  static fromFirestore(data: any): Omit<ITask, "id"> {
    return {
      name: data.name,
      description: data.description,
      date: data.date,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  userId: string;
  creationDate: string;
}

export class Event {
  static fromFirestore(data: any): Omit<IEvent, "id"> {
    return {
      name: data.name,
      description: data.description,
      date: data.date,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReptileTask {
  id: string;
  reptileId: string;
  taskId: string;
  userId: string;
  creationDate: string;
}

export class ReptileTask {
  static fromFirestore(data: any): Omit<IReptileTask, "id"> {
    return {
      reptileId: data.reptileId,
      taskId: data.taskId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReptileEvent {
  id: string;
  reptileId: string;
  eventId: string;
  userId: string;
  creationDate: string;
}

export class ReptileEvent {
  static fromFirestore(data: any): Omit<IReptileEvent, "id"> {
    return {
      reptileId: data.reptileId,
      eventId: data.eventId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReptileReminder {
  id: string;
  reptileId: string;
  reminderId: string;
  userId: string;
  creationDate: string;
}

export class ReptileReminder {
  static fromFirestore(data: any): Omit<IReptileReminder, "id"> {
    return {
      reptileId: data.reptileId,
      reminderId: data.reminderId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReptileLog {
  id: string;
  reptileId: string;
  logId: string;
  userId: string;
  creationDate: string;
}

export class ReptileLog {
  static fromFirestore(data: any): Omit<IReptileLog, "id"> {
    return {
      reptileId: data.reptileId,
      logId: data.logId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReptilePhoto {
  id: string;
  reptileId: string;
  photoId: string;
  userId: string;
  creationDate: string;
}

export class ReptilePhoto {
  static fromFirestore(data: any): Omit<IReptilePhoto, "id"> {
    return {
      reptileId: data.reptileId,
      photoId: data.photoId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}

export interface IReptileHealth {
  id: string;
  reptileId: string;
  healthId: string;
  userId: string;
  creationDate: string;
}

export class ReptileHealth {
  static fromFirestore(data: any): Omit<IReptileHealth, "id"> {
    return {
      reptileId: data.reptileId,
      healthId: data.healthId,
      userId: data.userId,
      creationDate: data.creationDate,
    };
  }
}
