import { Request, Response, NextFunction } from "express";
import { getCourseList, createCourse } from "@devcourses/domain";
import { prismaCourseServiceImplementation } from "../services/prisma-course-service-implementation";


export class CourseController {
    static async getAllCourses(req: Request, res: Response) {
        try {
            const result = await getCourseList({ dependencies: { courseService: prismaCourseServiceImplementation } });
            
            if (result instanceof Error) {
                return res.status(404).json({ message: result.message});

            }

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }

    static async createCourse(req: Request, res: Response) {
        try {
            const course = req.body;
            await createCourse({ 
                dependencies: { courseService: prismaCourseServiceImplementation }, 
                payload: course });
            
            return res.status(201).json({ message: "Course created successfully"});

        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }
}

