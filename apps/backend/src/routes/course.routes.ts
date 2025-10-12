import { Router } from "express";
import { CourseController } from "../controllers/course.controller";

const router = Router();

router.get("/", CourseController.getAllCourses);
// router.get('/:id', CourseController.getCourseById);
router.post("/", CourseController.createCourse);



export default router;