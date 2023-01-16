import { IUser } from "../users/user.model";
import { ErrorMessages } from "./types";

export const validateUser = (user: IUser): void => {
  if (
    user.hobbies !== undefined && Array.isArray(user.hobbies) &&
    user.hobbies.every((elem: any) => (typeof elem === 'string')) &&
    user.age !== undefined && typeof user.age === 'number' &&
    user.username !== undefined && typeof user.username === 'string'
  ) {
    return;
  }

  throw new Error(ErrorMessages.ERR_BODY_VALIDATION);
};
