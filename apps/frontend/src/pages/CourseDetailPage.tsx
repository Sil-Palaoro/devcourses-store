import React from "react";
import { Course } from "@devcourses/domain";
import { Button } from "../components/Button.js";
import { useNavigate } from "react-router-dom";

interface CourseDetailProps {
    course: Course;
}

const CourseDetailPage: React.FC<CourseDetailProps> = ({ course }) => {
    const navigate = useNavigate();

    return (
        <main className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p>Nivel del curso: {course.courseLevel}</p>
            <p>Lenguaje: {course.tag}</p>
            <p className="text-gray-400 mb-8">{course.description}</p>
            <p>Precio: $ {course.price}</p>
            <Button primary={false} label="Añadir al carrito" onClick={() =>{navigate("/cart")}} />
        </main>
    );
};

export default CourseDetailPage;


//     published: true,
//     instructorId: "1",
//     tag: "python"