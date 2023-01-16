import { v4 as uuidv4 } from 'uuid';
import { ErrorMessages } from "../helpers/types";

export interface IUser {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const usersDataBase: IUser[] = [];

export class UserModel {
  public static getUsers(): IUser[] {
    return usersDataBase;
  }

  public static getUser(id: string): IUser {
    const user = usersDataBase.find(user => user.id === id);

    if (!user) {
      throw new Error(ErrorMessages.ERR_USER_NOT_FOUND);
    }

    return user;
  }

  public static createUser(payload: IUser): Required<IUser> {
    const newId = uuidv4();
    const newUser = {id: newId, ...payload};

    usersDataBase.push(newUser);

    return newUser;
  }

  public static updateUser(id: string, payload: IUser): IUser {
    const index = usersDataBase.findIndex(user => user.id === id);

    usersDataBase[index] = { id, ...payload };

    return usersDataBase[index];
  }

  public static deleteUser(id: string): IUser {
    const index = usersDataBase.findIndex(user => user.id === id);
    const [deleteUser] = usersDataBase.splice(index, 1);

    return deleteUser;
  }
}
