import { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { UserRole } from "@devcourses/domain";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_dev_key";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: UserRole;
    };
}

interface CustomJwtPayload extends JwtPayload {
    id: string;
    role: UserRole;
}


export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o inválido"});
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado o inválido"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

        if (typeof decoded !== "object" || !("id" in decoded) || !("role" in decoded)) {
            return res.status(403).json({ message: "Token invalido o mal formado"});
        }

        const payload = decoded as CustomJwtPayload;
        
        req.user = {
            id: payload.id,
            role: payload.role,
        };

        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido o expirado"});
    }
};