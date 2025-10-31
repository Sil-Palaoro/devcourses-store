import { jwtDecode } from "jwt-decode";
import { UserRole } from "@devcourses/domain";

interface TokenPayload {
    userId: string;
    role: UserRole;
}

export const tokenDecoder = (token: string) => {
    const payload: TokenPayload = jwtDecode(token!);
    return payload;
}

