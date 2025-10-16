import bcrypt from "bcrypt";

export async function comparePasswords(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
}