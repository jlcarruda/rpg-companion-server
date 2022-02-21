import { Request, Response, NextFunction } from "express";

type RequestMockOptions = {
  headers?: {
    [key: string]: string;
  };
};

type ResponseMockOptions = {
  locals?: {
    [key: string]: string;
  };
  status?: jest.Mock;
  json?: jest.Mock;
};

type CreateExpressMockOptions = {
  reqOptions?: RequestMockOptions;
  resOptions?: ResponseMockOptions;
};

const defaultRequestMock = {
  headers: {},
};

const defaultResponseMock = {
  status: jest.fn(),
  json: jest.fn(),
  locals: {},
};

const statusMock = jest.fn(() => defaultResponseMock);
const jsonMock = jest.fn(() => defaultResponseMock);

defaultResponseMock.status = statusMock;
defaultResponseMock.json = jsonMock;

export const RequestMock = (additionals?: RequestMockOptions): Request =>
  ({
    ...defaultRequestMock,
    headers: {
      ...defaultRequestMock.headers,
      ...additionals?.headers,
    },
  } as Request);

export const ResponseMock = (additionals?: ResponseMockOptions): Response =>
  ({
    ...defaultResponseMock,
    locals: {
      ...defaultResponseMock.locals,
      ...additionals?.locals,
    },
    json: additionals?.json ?? defaultResponseMock.json,
    status: additionals?.status ?? defaultResponseMock.status,
  } as unknown as Response);

export const NextFunctionMock = jest.fn() as NextFunction;

export default ({ reqOptions, resOptions }: CreateExpressMockOptions = {}) => {
  return {
    request: RequestMock(reqOptions),
    response: ResponseMock(resOptions),
    next: NextFunctionMock,
    functions: {
      json: jsonMock,
      status: statusMock,
    },
  };
};
