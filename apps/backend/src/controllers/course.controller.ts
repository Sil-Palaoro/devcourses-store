import { Request, Response, NextFunction } from "express";
import { getCourseList } from "@devcourses/domain";
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
}

