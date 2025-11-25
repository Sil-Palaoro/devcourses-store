import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";
import { courseService } from "../services/courseService";
import { Course } from "@devcourses/domain";

const Home: React.FC = () => {
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const allCourses = await courseService.getAllCourses();
                setCourses(allCourses);
            } catch (err) {
                setError("No se pudieron cargar los cursos.")
            } finally {
                setLoadingCourses(false);
            };
        };
        fetchCourses();
    }, [])

    if (loadingCourses) return <p className="text-center mt-10">Cargando cursos...</p>
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>
    if(!courses || courses.length === 0) 
        return <p className="text-center text-gray-400 mb-4">No hay cursos disponibles</p>

    return (
<main className="w-full">

      {/* ------------------------ HERO -------------------------------- */}
      <section id="home" className="relative h-[60vh] flex items-center justify-center scroll-mt-28">
        <img
          src="/hero-bg-4.avif"
          alt="Background hero"
          className="absolute inset-0 w-full h-full object-cover opacity-90 blur-sm"
        />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-neon drop-shadow-lg">
            DevCourses Store
          </h1>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto text-lg">
            Formación práctica, moderna y pensada para que avances en tu carrera tech.
          </p>
        </div>
      </section>

      {/* ------------------------ INTRO -------------------------------- */}
      <section className="section text-center mt-12">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-purpleNeon">Bienvenido a tu espacio de aprendizaje</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mt-4">
          Aquí encontrarás cursos diseñados para que aprendas a tu ritmo, con contenido actualizado
          y orientado al mundo real. Nuestro objetivo es acompañarte en cada paso mientras
          desarrollás nuevas habilidades.
        </p>
      </section>

      {/* ------------------------ CURSOS -------------------------------- */}
      <section id="courses" className="section mt-12 scroll-mt-28">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-purpleNeon mb-6">Cursos Disponibles</h2>

        {loadingCourses && <p className="text-center mt-6">Cargando cursos...</p>}
        {error && <p className="text-center text-red-500 mt-6">{error}</p>}

        {courses && courses.length > 0 ? (
          <CourseList courses={courses} />
        ) : (
          !loadingCourses && <p className="text-gray-400 text-center">No hay cursos disponibles.</p>
        )}
      </section>

      {/* ------------------------ SOBRE NOSOTROS -------------------------------- */}
      <section id="about-us" className="section mt-16 scroll-mt-28">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-purpleNeon">
          Sobre Nosotros
        </h2>

        <div className="bg-dark border border-accent/30 rounded-xl p-6 shadow-md w-full mb-6">
          <p className="text-gray-300  leading-relaxed text-lg">
            En DevCourses Store creemos que el aprendizaje debe ser accesible, práctico y motivador.
            Nuestro enfoque está orientado a brindar contenido claro, proyectos reales y una
            experiencia de estudio moderna.  
            <br /><br />
            Todo el material es creado con dedicación para ayudarte a construir habilidades sólidas,
            desde tus primeros pasos en programación hasta niveles avanzados.
          </p>
        </div>
      </section>
    </main>
    );
};

export default Home;
