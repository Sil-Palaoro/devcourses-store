import { Router } from "express";
import { CourseController } from "../controllers/course.controller";

const router = Router();

router.get("/", CourseController.getAllCourses);
router.get("/by-tag", CourseController.getCourseByTag);
router.get("/by-course-level", CourseController.getCourseByCourseLevel);


router.get('/:id', CourseController.getCourseById);

router.post("/", CourseController.createCourse);

router.delete('/delete/:id', CourseController.deleteCourse);


export default router;