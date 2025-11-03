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
        <main className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">DevCourses Store</h1>
            <p className="text-gray-400 mb-8">Tus cursos de programación online</p>
            <CourseList courses={courses} />
        </main>
    );
};

export default Home;