import jwt from "jsonwebtoken";
import { UserRole } from "../../entities/user";

const SECRET_KEY = process.env.JWT_SECRET || "fallback_dev_key";

export function generateToken(payload: { id: string, role: UserRole }) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
}