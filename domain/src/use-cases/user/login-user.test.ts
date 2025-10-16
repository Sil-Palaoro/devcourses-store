import { describe, expect, test, vi } from "vitest";
import { userServiceMockUnit } from "../../services/mocks/user-service-mock.unit";
import { loginUser } from "./login-user";
import { comparePasswords } from "../../utils/crypto/compare-passwords";
import { generateToken } from "../../utils/crypto/generate-jwt";


vi.mock("../../utils/crypto/compare-passwords", () => ({
    comparePasswords: vi.fn(async() => true)
}));

vi.mock("../../utils/crypto/generate-jwt", () => ({
    generateToken: vi.fn(() => "fake-jwt-token")
}))

describe("loginUser (unit)", async () =>{

    test("Given user credentials, should validate existing user and password and call to generate jwt", async () => {
        userServiceMockUnit.getByEmail = vi.fn().mockResolvedValueOnce({
            id: "1",
            name: "Silvi",
            surname: "Pala",
            email: "silvi@gmail.com",
            password: "hashed-123456",
            role: "admin",
        });

        const credentials = {
            email: "silvi@gmail.com",
            password: "123456"
        };
        
        const result = await loginUser({
            dependencies: { userService: userServiceMockUnit },
            payload: credentials,
        });

        expect(userServiceMockUnit.getByEmail).toHaveBeenCalledWith(credentials.email);
        expect(comparePasswords).toHaveBeenCalledWith(
            credentials.password, 
            "hashed-123456"
        );
        expect(comparePasswords).toBeTruthy();      
        expect(generateToken).toHaveBeenCalledTimes(1); 
        expect(result).toBe("fake-jwt-token")     

    });
});
