import React from "react";
import { Course } from "@devcourses/domain";
import { Button } from "./Button.js";
import { useNavigate } from "react-router-dom";


interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full border border-purpleNeon/20 rounded-lg p-6 hover:shadow-neon transition-shadow bg-darkLight border-accent/40">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>

            <p className="text-gray-400 text-base mb-4 leading-relaxed">
                {course.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-purpleNeon font-bold text-xl">
                    ${course.price}
                </span>
                <Button 
                    primary={false} 
                    label="Ver más" 
                    onClick={()=>{navigate(`/courses/${course.id}`)}} 
                />     
            </div>
        </div>
    );
};

export default CourseCard;
