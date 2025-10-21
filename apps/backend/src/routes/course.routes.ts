import { Router } from "express";
import { CourseController } from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorizeRoles } from "../middlewares/roleMiddleware";
import { UserRole } from "@devcourses/domain";

const router = Router();

const ADMIN: UserRole = "admin";
const INSTRUCTOR: UserRole = "instructor";

//GET
router.get("/", CourseController.getAllCourses);
router.get("/by-tag", CourseController.getCourseByTag);
router.get("/by-course-level", CourseController.getCourseByCourseLevel);

router.get('/:id', CourseController.getCourseById);

//POST
router.post(
    "/", 
    authMiddleware, 
    authorizeRoles(ADMIN, INSTRUCTOR), 
    CourseController.createCourse
);

//PATCH
router.patch(
    '/update/:id', 
    authMiddleware, 
    authorizeRoles(ADMIN, INSTRUCTOR), 
    CourseController.updateCourse
);

//DELETE
router.delete(
    '/delete/:id',
    authMiddleware, 
    authorizeRoles(ADMIN),  
    CourseController.deleteCourse
);


export default router;