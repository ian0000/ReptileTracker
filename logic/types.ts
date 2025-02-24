export interface IUser {
  id: string;
  name: string;
  email: string;
  creationDate: string;
  password: string;
}

export class User {
  static fromFirestore(data: any): Omit<IUser, "password"> {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      creationDate: data.creationDate,
    };
  }
}
export class Reptile {
 static fronFirestore(data:any):
 


}
