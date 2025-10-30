import React from "react";
import { Course } from "@devcourses/domain";
import { Button } from "./Button";

                //TODO: Agregar onClick con navigate a CardDetailPage


interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="bg-darkLight border border-purpleNeon rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-400 text-sm mb-4">{course.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-purpleNeon font-bold">${course.price}</span>
                <Button primary={false} label="Ver más" onClick={()=>{}} />     
            </div>
        </div>
    );
};

export default CourseCard;