import { ServerResponse } from "http";

export class Response {
  private static response: ServerResponse;

  public static setResponse(response: ServerResponse): void {
    Response.response = response;
  }

  public static send(status: number, payload: any|null = null): void {
    Response.response.writeHead(status, {'Content-Type': 'application/json'});

    if (payload !== null) {
      Response.response.write(JSON.stringify(payload));
    }

    Response.response.end();
  }
}
