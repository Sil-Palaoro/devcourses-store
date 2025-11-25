import React, { useEffect, useState } from "react";
import { courseService } from "../../services/courseService";
import type {
  Course,
  CreateCourseDTO,
  UpdateCourseDTO,
  CourseLevel,
  Tag
} from "@devcourses/domain";
import { Modal } from "../Modal";

export const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState<Partial<CreateCourseDTO>>({
    title: "",
    description: "",
    courseLevel: "beginner",
    price: 0,
    tag: "javascript",
  });

  const loadCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      if (data)
          setCourses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar cursos
  useEffect(() => {
    loadCourses();
  }, []);

  // Abrir modal (nuevo o edición)
  const openModal = (course?: Course) => {
    if (course) {
      setSelectedCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        courseLevel: course.courseLevel,
        price: course.price,
        tag: course.tag,
      });
    } else {
      setSelectedCourse(null);
      setFormData({
        title: "",
        description: "",
        courseLevel: "beginner",
        price: 0,
        tag: "javascript",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Guardar (crear o editar)
  const handleSave = async () => {
    try {
      if (selectedCourse) {
        const payload: UpdateCourseDTO = {
          id: selectedCourse.id,
          data: {
            title: formData.title!,
            description: formData.description!,
            courseLevel: formData.courseLevel as CourseLevel,
            price: formData.price!,
            tag: formData.tag as Tag,
          },
        };
        const updated = await courseService.updateCourse(payload);
        if (updated)
            setCourses((prev) =>
              prev.map((c) => (c.id === updated.id ? updated : c))
            );
      } else {
        const newCourse = await courseService.createCourse(formData as CreateCourseDTO);
        if (newCourse)
            setCourses((prev) => [...prev, newCourse]);
      }
      closeModal();
      loadCourses();
    } catch (err: any) {
      alert(`Error al guardar curso: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar este curso?")) {
      try {
        await courseService.deleteCourse(id);
        setCourses((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        alert(`Error al borrar el curso: ${error}`)
      }

    }
  };

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-fucsiaNeon drop-shadow-neon">
          Gestión de Cursos
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-gradient-neon text-white px-5 py-2 rounded-lg shadow-neon hover:scale-105 transition-transform duration-200"
        >
          Nuevo Curso
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-[0_0_8px_#A020F0]">
      <table className="min-w-full bg-[#0D0D0D] text-left border border-purpleNeon/40 rounded-lg">
        <thead className="bg-[#1a002b] border-b border-purpleNeon/50 text-fucsiaNeon">
          <tr>
            <th className="p-3">Título</th>
            <th className="p-3">Nivel</th>
            <th className="p-3">Precio</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr 
            key={c.id}
            className="border-b border-purpleNeon/20 hover:bg-purpleNeon/10 transition"
            >
              <td className="p-3">{c.title}</td>
              <td className="p-3">{c.courseLevel}</td>
              <td className="p-3 capitalize text-accent">${c.price}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => openModal(c)}
                  className="text-purpleNeon hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-xl font-bold mb-4 text-fucsiaNeon drop-shadow-neon">
          {selectedCourse ? "Editar Curso" : "Nuevo Curso"}
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
            placeholder="Título"
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Descripción"
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
         <select
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.courseLevel}
            onChange={(e) =>
              setFormData({
                ...formData,
                courseLevel: e.target.value as CourseLevel,
              })
            }
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>

          <input
            type="number"
            placeholder="Precio"
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />

         <select
            className="bg-dark border border-purpleNeon/40 p-2 w-full rounded text-white focus:border-fucsiaNeon outline-none"
            value={formData.tag}
            onChange={(e) =>
              setFormData({
                ...formData,
                tag: e.target.value as Tag,
              })
            }
          >
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
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
