import React, { useState, useEffect } from "react";
import { CartItem } from "@devcourses/domain";
import { courseService } from "../services/courseService";
import { Course } from "@devcourses/domain";
import { Button } from "./Button";


interface CartItemCardProps {
    cartItem: CartItem;
    onRemoveItem: (cartItemId: string) => Promise<void>;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ cartItem, onRemoveItem }) => {
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState<Course | null>(null);
    const courseId = cartItem.courseId;
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const course = await courseService.getCourseById(courseId);
                setCourse(course);
            } catch (err) {
                setError("No se pudo cargar el curso.")
            };        
        };

        fetchCourse();
    }, []);

    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>


    return (
        <div className="bg-darkLight border border-purpleNeon rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold mb-2">Curso: {course?.title}</h2>
            <p className="text-gray-400 text-sm mb-4">Cantidad: {cartItem.quantity}</p>
            <div className="flex justify-between items-center">
                <span className="text-purpleNeon font-bold pr-20">
                    Subtotal ${cartItem.priceSnapshot * cartItem.quantity}
                </span>
                <Button 
                    primary={false} 
                    label={loading ? "Cargando..": "Quitar"} 
                    onClick={()=> {onRemoveItem(cartItem.id)}} />     
            </div>
        </div>
    );
};

export default CartItemCard;