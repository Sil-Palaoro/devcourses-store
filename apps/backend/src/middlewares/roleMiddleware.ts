import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";
import { UserRole } from "@devcourses/domain";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Usuario no autenticado"});
        }

        const { role } = req.user;

        if(!allowedRoles.includes(role)) {
            return res.status(403).json({ message: "Acceso denegado: rol no autorizado"});
        }

        next();
    }
}