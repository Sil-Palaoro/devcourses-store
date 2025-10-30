import React from "react";
import CourseList from "../components/CourseList";
import { dataCourses } from "../mocks/course-mock";

const Home = () => {
    return (
        <main className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">DevCourses Store</h1>
            <p className="text-gray-400 mb-8">Tus cursos de programación online</p>
            <CourseList courses={dataCourses} />
        </main>
    );
};

export default Home;