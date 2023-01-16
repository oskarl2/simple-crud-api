import 'dotenv/config'
import * as http from "http";
import { router } from "./router";
import * as process from "process";
import { Response } from "./helpers/response";
import { ErrorMessages, StatusCodes } from "./helpers/types";
import { IncomingMessage, ServerResponse } from "http";
import * as domain from "domain";

const PORT = process.env.PORT || 4000;
const server = http.createServer();

const createServer = () => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

  server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    const domainInstance = domain.create();

    domainInstance.on('error', (error) => {
      if (error.message === ErrorMessages.ERR_RESOURCE_NOT_FOUND) {
        Response.send(StatusCodes.NOT_FOUND, { message: ErrorMessages.ERR_RESOURCE_NOT_FOUND });

        return;
      }

      if (error.message === ErrorMessages.ERR_USER_NOT_FOUND) {
        Response.send(StatusCodes.NOT_FOUND, { message: ErrorMessages.ERR_USER_NOT_FOUND });

        return;
      }

      if (error.message === ErrorMessages.ERR_BODY_VALIDATION) {
        Response.send(StatusCodes.BAD_REQUEST, { message: ErrorMessages.ERR_BODY_VALIDATION });

        return;
      }

      Response.send(StatusCodes.INTERNAL_SERVER_ERROR, {message: ErrorMessages.ERR_SERVER_ERROR});
    });

    domainInstance.add(request);
    domainInstance.add(response);

    domainInstance.run( () => {
      Response.setResponse(response);
      router(request);
    });
  });
}

createServer();
