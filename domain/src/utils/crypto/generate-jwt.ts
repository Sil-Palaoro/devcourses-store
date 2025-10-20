import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "fallback_dev_key";

export function generateToken(payload: { id: string, role: string }) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
}