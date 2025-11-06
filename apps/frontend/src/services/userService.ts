import api from "./api";
import type { CreateUserDTO, UpdateUserDTO, SafeUser, User, UserRole } from "@devcourses/domain";

interface UserService {
  getAllUsers: () => Promise<SafeUser[] | null>
  getById: (id: string) => Promise<SafeUser | undefined>;
  createUser: (data: CreateUserDTO) => Promise<SafeUser>;
  updateUser: (payload: UpdateUserDTO) => Promise<SafeUser | undefined>;
  deleteUser: (id: string) => Promise<void>;   
  getByRole: (role: UserRole) => Promise<SafeUser[]>;
  getByName: (name: string) => Promise<SafeUser[]>;
  getBySurname: (surname: string) => Promise<SafeUser[]>;
  getByEmail: (email: string) => Promise<SafeUser | undefined>;
};

//UserServices except register and login that are mamaged by the AuthContext
export const userService: UserService = {
  async getAllUsers() {return api.get("/users")},

  async getById(id) {return api.get(`/users/${id}`)},
  
  async createUser(data) {return api.post("/users", data)},

  async updateUser(payload) {return api.patch(`/users/update/${payload.id}`, payload.data)},
  
  async deleteUser(id) {return api.delete(`/users/delete/${id}`)},
  
  async getByRole(role) {return api.get(`/users/by-role/role?=${role}`)},
  
  async getByName(name) {return api.get(`/users/by-name/name?=${name}`)},
  
  async getBySurname(surname) {return api.get(`/users/by-surname/surname?=${surname}`)},
  
  async getByEmail(email) {return api.get(`/users/by-email/email?=${email}`)},
}
