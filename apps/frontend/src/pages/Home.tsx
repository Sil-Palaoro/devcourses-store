import React from "react";
import CourseList from "../components/CourseList";
import { courseService } from "../services/courseService";
import { Course } from "@devcourses/domain";

const Home: React.FC = async () => {
    const allCourses: Course[] | null = await courseService.getAllCourses();

    if(!allCourses) return <p className="text-gray-400 mb-4">No hay cursos disponibles</p>


    return (
        <main className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">DevCourses Store</h1>
            <p className="text-gray-400 mb-8">Tus cursos de programación online</p>
            <CourseList courses={allCourses} />
        </main>
    );
};

export default Home;