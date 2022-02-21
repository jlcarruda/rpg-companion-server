import createExpressMock from "../../mocks/express.mock";
import { validateToken } from "../../../src/middlewares";
import JWT from "../../../src/helpers/jwt.helper";

const MOCK_VALIDATED_DATA = {
  userID: "12345",
  role: "player",
};

const MOCK_JWT_TOKEN = "12332112312";

describe("validateToken Middleware Unit Test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(JWT, "checkToken").mockReturnValue(MOCK_VALIDATED_DATA);
  });

  it("should successfully add authData to locals", () => {
    // jest.spyOn(JWT, "checkToken").mockReturnValue(MOCK_VALIDATED_DATA);
    const {
      request,
      response,
      next,
      functions: { status, json },
    } = createExpressMock({
      reqOptions: {
        headers: {
          authorization: `Bearer ${MOCK_JWT_TOKEN}`,
        },
      },
    });

    validateToken(request, response, next);

    expect(next).toBeCalledTimes(1);
    expect(status).not.toBeCalled();
    expect(json).not.toBeCalled();
    expect(response.locals.authData).toBeDefined();
    expect(response.locals.authData).toStrictEqual(MOCK_VALIDATED_DATA);
  });

  it("should respond with status 401 if token is not passed", () => {
    const {
      request,
      response,
      next,
      functions: { status, json },
    } = createExpressMock();

    validateToken(request, response, next);

    expect(next).not.toBeCalled();
    expect(status).toBeCalledWith(401);
    expect(json).toBeCalledTimes(1);
    expect(json).toBeCalledWith({ message: "Token is required!" });
  });

  it("should respond with status 401 if token is passed without respecting the RFC 6750", () => {
    const {
      request,
      response,
      next,
      functions: { status, json },
    } = createExpressMock({
      reqOptions: {
        headers: {
          authorization: `${MOCK_JWT_TOKEN}`,
        },
      },
    });

    validateToken(request, response, next);

    expect(next).not.toBeCalled();
    expect(status).toBeCalledWith(401);
    expect(json).toBeCalledTimes(1);
    expect(json).toBeCalledWith({ message: "invalid token!" });
  });

  it("should respond with status 403 if checkToken function throws an error", () => {
    jest.spyOn(JWT, "checkToken").mockImplementation(() => {
      throw new Error("Mock Error");
    });
    const {
      request,
      response,
      next,
      functions: { status, json },
    } = createExpressMock({
      reqOptions: {
        headers: {
          authorization: `Bearer ${MOCK_JWT_TOKEN}`,
        },
      },
    });

    validateToken(request, response, next);

    expect(next).not.toBeCalled();
    expect(status).toBeCalledWith(403);
    expect(json).toBeCalledTimes(1);
    expect(json).toBeCalledWith({ message: "token expired or invalid!" });
  });
});
