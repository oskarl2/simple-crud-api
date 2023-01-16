import { IncomingMessage } from "http";
import { validateUser } from "../helpers/validation";
import { Response } from "../helpers/response";
import { UserModel } from "./user.model";
import { StatusCodes } from "../helpers/types";

class UserController {
  createUser = (request: IncomingMessage): void => {
    let requestBody: string = '';

    request.on('data', (chunk: any) => {
      requestBody += chunk.toString();
    });

    request.on('end', () => {
      const parsedBody = JSON.parse(requestBody);

      validateUser(parsedBody);

      const createdUser = UserModel.createUser(parsedBody);

      Response.send(StatusCodes.CREATED, createdUser);
    });
  };

  getUser = (id: string): void => {
    Response.send(StatusCodes.OK, UserModel.getUser(id));
  };

  updateUser = (request: IncomingMessage, id: string): void => {
    let requestBody: string = '';

    request.on('data', (chunk: any) => {
      requestBody += chunk.toString();
    });

    request.on('end', () => {
      const parsedBody = JSON.parse(requestBody);

      validateUser(parsedBody);

      const updatedUser = UserModel.updateUser(id, parsedBody);

      Response.send(StatusCodes.OK, updatedUser);
    });
  };

  deleteUser = (id: string): void => {
    UserModel.deleteUser(id);
    Response.send(StatusCodes.NO_CONTENT);
  };

  getUsers = (): void => {
    Response.send(StatusCodes.OK, UserModel.getUsers());
  };
}

export default (() => new UserController())();
