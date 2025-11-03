import { jwtDecode } from "jwt-decode";
import { UserRole } from "@devcourses/domain";


interface RawTokenPayload {
    id: string;
    role: UserRole;
}
interface TokenPayload {
    userId: string;
    role: UserRole;
}

export const tokenDecoder = (token: string): TokenPayload => {
    const payload: RawTokenPayload = jwtDecode(token!);
    return {
        userId: payload.id,
        role: payload.role
    };
}

