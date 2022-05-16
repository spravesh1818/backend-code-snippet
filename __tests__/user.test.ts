import { UserPayload } from "../src/common/dto/user.dto";
import * as userService from "../src/core/services/user.service";

describe("Testing users", () => {
  test("Get User List", () => {
    const workflows = userService.getUsers();
    expect(workflows).toBeInstanceOf([]);
  });

  test("Add a user", () => {
    const userData: UserPayload = {
      name: "Pravesh Chapagain",
      email: "spravesh1818@gmail.com",
    };

    const workflowResponse = userService.insertUser(userData);
    expect(workflowResponse).toBeInstanceOf(UserPayload);
  });
});
