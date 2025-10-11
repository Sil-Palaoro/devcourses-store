import { describe, expect, test } from "vitest";
import { userServiceMock } from "../../services/mocks/user-service-mock";
import { deleteUser } from "./delete-user";


describe("deleteUser", async () =>{

    test("Given an id, should delete the user", async () => {
        const id = "6";
        await deleteUser({
            dependencies: {userService: userServiceMock},
            payload: { id }}
        ); 
        expect(userServiceMock.delete).toHaveBeenCalledTimes(1);
        expect(userServiceMock.delete).toHaveBeenCalledWith(id);
    })
});