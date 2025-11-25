import React from "react";
import CourseCard from "./CourseCard.js";
import { Course } from "@devcourses/domain";

interface CourseListProps {
    courses: Course[];
}

const levelLabels: Record<string, string> = {
    beginner: "Nivel Inicial",
    intermediate: "Nivel Intermedio",
    advanced: "Nivel Avanzado"
};

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
    const grouped = courses.reduce((acc, course) => {
        const level = course.courseLevel?.toLowerCase() || "Sin nivel";
        if (!acc[level]) acc[level] = [];
        acc[level].push(course);
        return acc;
    }, {} as Record<string, Course[]>);

    return (
        <div className="space-y-14">
            {Object.entries(grouped).map(([level, courses]) => (
                <section key={level}>
                    <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-neon">
                        {levelLabels[level] || "Otros cursos"}
                    </h2>

                    <div className="border-t border-accent/40 mb-8" />

                    <div className="space-y-6">
                        {courses
                            .filter(course => course.published)
                            .map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        }
                    </div>
                </section>
            ))}
        </div>
    );
};

export default CourseList;