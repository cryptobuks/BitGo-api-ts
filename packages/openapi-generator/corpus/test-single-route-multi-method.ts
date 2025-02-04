//! should handle multiple routes at one path

/// file: index.ts

import * as t from 'io-ts';
import * as h from '@api-ts/io-ts-http';

const FirstRoute = h.httpRoute({
  path: '/test/{id}',
  method: 'GET',
  request: h.httpRequest({
    query: {},
    params: {
      /** @param id the test id */
      id: t.string,
    },
  }),
  response: {
    200: t.string,
  },
} as const);

const SecondRoute = h.httpRoute({
  path: '/test/{id}',
  method: 'POST',
  request: h.httpRequest({
    query: {},
    params: {
      /** @param id the test id */
      id: t.string,
    },
    body: {
      id: t.number,
      message: t.string,
    },
  }),
  response: {
    200: t.string,
  },
});

export const Routes = h.apiSpec({
  'api.v1.test': {
    get: FirstRoute,
    post: SecondRoute,
  },
});

///

`
{
  "openapi": "3.1.0",
  "info": {
    "title": "test",
    "version": "0.1.0"
  },
  "paths": {
    "/test/{id}": {
      "get": {
        "summary": "FirstRoute",
        "parameters": [
          {
            "name": "id",
            "schema": {
              "type": "string"
            },
            "required": true,
            "in": "path",
            "description": "the test id"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "SecondRoute",
        "parameters": [
          {
            "name": "id",
            "schema": {
              "type": "string"
            },
            "required": true,
            "in": "path",
            "description": "the test id"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "content": {
              "application/json": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        },
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "id",
                  "message"
                ],
                "properties": {
                  "id": {
                    "type": "number"
                  },
                  "message": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "required": true
        }
      }
    }
  },
  "components": {
    "schemas": {
    }
  }
}`;
