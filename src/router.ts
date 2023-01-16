import { IncomingMessage } from "http";
import { ErrorMessages } from "./helpers/types";
import UserController from "./users/user.controller";

export const router = (request: IncomingMessage): void => {
  const url = request.url;

  if (url === undefined) {
    throw new Error('Url is undefined');
  }

  if (url === '/api/users') {
    if (request.method === 'GET') {
      UserController.getUsers();

      return;
    }

    if (request.method === 'POST') {
      UserController.createUser(request);

      return;
    }
  }

  if (url.search(/\/api\/users\/[a-z\d-]/) !== -1) {
    const id = url.replace('/api/users/', '');

    if (request.method === 'PUT') {
      UserController.updateUser(request, id);

      return;
    }

    if (request.method === 'GET') {
      UserController.getUser(id);

      return;
    }

    if (request.method === 'DELETE') {
      UserController.deleteUser(id);

      return;
    }
  }

  throw new Error(ErrorMessages.ERR_RESOURCE_NOT_FOUND);
};
