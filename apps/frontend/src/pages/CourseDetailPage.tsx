import React, { useState, useEffect } from "react";
import { Course } from "@devcourses/domain";
import { Button } from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { cartService } from "../services/cartService";
import { useParams, useNavigate } from "react-router-dom";
import { courseService } from "../services/courseService";
import { useAuthModals } from "../contexts/AuthModalContext";


const CourseDetailPage: React.FC = () => {
    const { userId, isAuthenticated, userRole } = useAuth();
    const { openLoginModal } = useAuthModals();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    // const [loadingCourse, setLoadingCourse] = useState(true);
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (!id) return;
                const courseData: Course | null = await courseService.getById(id);
                setCourse(courseData);
            } catch (err: any) {
                setMessage("No se pudo obtener el curso")
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id])

    useEffect(() => {
      console.log("Auth debug →", {
        isAuthenticated,
        userId,
        userRole,
        token: localStorage.getItem("dc_token"),
      });
    }, [isAuthenticated, userId]);

    if (loading) return <p className="text-center mt-10">Cargando curso...</p>;
    if (message) return <p className="text-center text-gray-500 mt-10">{message}</p>;
    if (!course) return <p className="text-center text-red-500 mt-10">Curso no encontrado</p>
    
    const addToCart = async () => {
        if (!isAuthenticated || !userId) {
            openLoginModal();
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await cartService.addItem(userId, course.id, course.price);
            setMessage("Curso añadido al carrito exitosamente")
            navigate("/cart");
        } catch (error: any) {
            if(error.response?.data?.message?.includes("no tiene un carrito")) {
                try {
                    await cartService.createCart(userId);
                    await cartService.addItem(userId, course.id, course.price);
                    setMessage("Carrito creado y curso añadido al carrito exitosamente");
                    navigate("/cart");
                } catch (err) {
                   console.error(err);
                   setMessage("Error al crear el carrito") 
                };
            } else if (
                error.response?.data?.message?.includes("ya existe en el carrito")
            ) {
                setMessage("El curso ya está en el carrito");
            } else {
                console.error(error);
                setMessage("Error al añadir el curso");
            };
        } finally {
            setLoading(false);
        };
    };

    return (
        <main className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p>Nivel del curso: {course.courseLevel}</p>
            <p>Lenguaje: {course.tag}</p>
            <p className="text-gray-400 mb-8">{course.description}</p>
            <p>Precio: $ {course.price}</p>
            <Button 
                primary={false} 
                label={loading ? "Agregando.." : "Añadir al carrito"} 
                onClick={addToCart} 
            />
            {message && <p className="mt-3 text-sm">{message}</p>}
        </main>
    );
};

export default CourseDetailPage;
