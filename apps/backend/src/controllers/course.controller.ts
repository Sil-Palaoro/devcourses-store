import { Request, Response } from "express";
import { getCourseList, 
    createCourse,
    getCourse, 
    getCoursesByTag, 
    getCoursesByLevel,
    updateCourse,
    deleteCourse,
    Tag,
    CourseLevel
  } from "@devcourses/domain";
import { prismaCourseServiceImplementation } from "../services/prisma-course-service-implementation";
import { createCourseSchema, updateCourseSchema } from "../validators/course.validator";


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


    static async getCourseById(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const course = await getCourse({ 
            dependencies: { courseService: prismaCourseServiceImplementation }, 
            payload: {id: id} 
            });

          if (course instanceof Error) {
            return res.status(404).json({ message: course.message });
          }
          res.status(200).json(course);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async getCourseByTag(req: Request, res: Response) {
        try {
          const { tag } = req.query;

          if (!tag || typeof tag !== "string") {
            return res.status(400).json({ message: "Tag is required" });
          } 

          const validTags: Tag[] = ["javascript", "python", "sql"]

          if (!validTags.includes(tag as Tag)) {
            return res.status(400).json({ message: "Invalid tag value"});
          }

          const courses = await getCoursesByTag({ 
            dependencies: { courseService: prismaCourseServiceImplementation }, 
            payload: {tag: tag as Tag} 
            });

          if (courses instanceof Error) {
            return res.status(404).json({ message: courses.message });
          }
          res.status(200).json(courses);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


   static async getCourseByCourseLevel(req: Request, res: Response) {
        try {
          const { courseLevel } = req.query;

          if (!courseLevel || typeof courseLevel !== "string") {
            return res.status(400).json({ message: "Course level is required" });
          } 

          const validCourseLevels: CourseLevel[] = ["beginner", "intermediate", "advanced"]

          if (!validCourseLevels.includes(courseLevel as CourseLevel)) {
            return res.status(400).json({ message: "Invalid course level value"});
          }

          const courses = await getCoursesByLevel({ 
            dependencies: { courseService: prismaCourseServiceImplementation }, 
            payload: {courseLevel: courseLevel as CourseLevel} 
            });

          if (courses instanceof Error) {
            return res.status(404).json({ message: courses.message });
          }
          res.status(200).json(courses);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }


    static async createCourse(req: Request, res: Response) {
        try {
          const validatedCourse = createCourseSchema.parse(req.body)  
          
          await createCourse({ 
              dependencies: { courseService: prismaCourseServiceImplementation }, 
              payload: validatedCourse });
          
          return res.status(201).json({ message: "Course created successfully"});

        } catch (error: any) {
          if (error.name === "ZodError") {
            return res.status(400).json({
              message: "Datos inválidos",
              errors: error.issues,
            })
          }

          res.status(500).json({ message: error.message});
        }
    }


  static async updateCourse(req: Request, res: Response) {
        try {
          const id = req.params.id!;
          const validatedData = updateCourseSchema.parse(req.body);

          const updatedCourse = await updateCourse({ 
            dependencies: { courseService: prismaCourseServiceImplementation }, 
            payload: {
              id: id, 
              data: validatedData} 
            });

          if (updatedCourse instanceof Error) {
            return res.status(404).json({ message: updatedCourse.message });
          }
          res.status(200).json(updatedCourse);
        } catch (error: any) {
          if (error.name === "ZodError") {
            return res.status(400).json({
              message: "Datos inválidos",
              errors: error.issues,
            })
          }

          res.status(500).json({ message: error.message });
        }
    }


    static async deleteCourse(req: Request, res: Response) {
      try {
        const id = req.params.id!;
        await deleteCourse({ 
          dependencies: { courseService: prismaCourseServiceImplementation }, 
          payload: {id: id} 
          });
        res.status(200).json({ message: "Course deleted successfully"});
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    }
}

