import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import type { SafeUser, CreateUserDTO, UpdateUserDTO, UserRole } from "@devcourses/domain";
import { Modal } from "../Modal";

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SafeUser | null>(null);
  const [formData, setFormData] = useState<Partial<CreateUserDTO>>({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "student",
  });

  // Cargar lista de usuarios
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        if (data)
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Abrir modal (nuevo o edición)
  const openModal = (user?: SafeUser) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "student",
      });
    }
    setIsModalOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Guardar cambios (crear o editar)
  const handleSave = async () => {
    try {
      if (selectedUser) {
        // Editar usuario
        const payload: UpdateUserDTO = {
          id: selectedUser.id,
          data: {
            name: formData.name,
            surname: formData.surname,
            email: formData.email,
            role: formData.role as UserRole,
          },
        };
        const updated = await userService.updateUser(payload);
        if (updated)
          setUsers((prev) =>
            prev.map((u) => (u.id === updated.id ? updated : u))
          );
      } else {
        // Crear nuevo usuario
        const newUser = await userService.createUser(formData as CreateUserDTO);
        setUsers((prev) => [...prev, newUser]);
      }
      closeModal();
    } catch (err: any) {
      alert(`Error al guardar usuario: ${err.message}`);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-fucsiaNeon drop-shadow-neon">
          Gestión de Usuarios</h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-neon text-white px-5 py-2 rounded-lg shadow-neon hover:scale-105 transition-transform duration-200"
        >
          Nuevo Usuario
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-[0_0_8px_#A020F0]">
        <table className="min-w-full bg-[#0D0D0D] text-left border border-purpleNeon/40 rounded-lg">
          <thead className="bg-[#1a002b] border-b border-purpleNeon/50 text-fucsiaNeon">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Email</th>
              <th className="p-3">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr 
                key={u.id}
                className="border-b border-purpleNeon/20 hover:bg-purpleNeon/10 transition"  
              >
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.surname}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize text-accent">{u.role}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => openModal(u)}
                    className="text-purpleNeon hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-fucsiaNeon hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de creación/edición */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-xl font-bold mb-4 text-fucsiaNeon drop-shadow-neon">
          {selectedUser ? "Editar Usuario" : "Nuevo Usuario"}
        </h3>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.surname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          {!selectedUser && (
            <input
              type="password"
              placeholder="Contraseña"
              className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          )}

          <select
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as UserRole,
              })
            }
          >
            <option value="admin">Administrador</option>
            <option value="instructor">Instructor</option>
            <option value="student">Estudiante</option>
          </select>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-[#222] rounded text-gray-300 hover:text-white hover:shadow-neon"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-neon rounded text-white font-semibold hover:scale-105 transition-transform duration-200"
            >
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
