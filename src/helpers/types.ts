export const enum ErrorMessages {
  ERR_USER_NOT_FOUND = 'User not found',
  ERR_BODY_VALIDATION = 'Request body does not contain required fields',
  ERR_RESOURCE_NOT_FOUND = "Requested resource doesn't exist",
  ERR_SERVER_ERROR = 'Internal Error'
}

export const enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
