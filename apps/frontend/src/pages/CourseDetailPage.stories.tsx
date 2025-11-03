import * as router from "react-router-dom";
import { vi } from "vitest";
import { Meta, StoryObj } from "@storybook/react-vite";
import CourseDetailPage from "./CourseDetailPage.js";
import Layout from "../components/Layout.js";
import { MockAuthProvider } from "../mocks/MockAuthProvider.js";
import { UserRole, Course } from "@devcourses/domain";
import * as courseServiceImport from "../services/courseService.js";
import { courseMock } from "../mocks/course-mock.js";

(courseServiceImport as any).courseService.getById = (id: string) => {
   console.log("Mock getById called with id:", id);
   return Promise.resolve(courseMock);
  }


interface StoryArgs {
    course: Course,
    isAuthenticated?: boolean;
    userRole?: UserRole;
    onClick?: () =>void;
}

const meta: Meta<StoryArgs> = {
    title: 'Pages/CourseDetailPage',
    component: CourseDetailPage,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        (Story, context) => (
            <MockAuthProvider
                isAuthenticated={context.args.isAuthenticated}
                userRole={context.args.userRole}
            >
              <Layout>
                <Story />
              </Layout>
            </MockAuthProvider>
        )
    ],
} 

export default meta;
type Story = StoryObj<typeof meta>;

export const CourseDetailPageLoggedOut: Story = {
    args: {
        isAuthenticated: false,
    },
};

export const CourseDetailPageLoggedInStudent: Story = {
  args: {
    
    isAuthenticated: true,
    userRole: "student"
  }
};

export const CourseDetailPageLoggedInInstructor: Story = {
  args: {    
    isAuthenticated: true,
    userRole: "instructor",
  }
};

export const CourseDetailPageLoggedInAdmin: Story = {
  args: {    
    isAuthenticated: true,
    userRole: "admin"
  }
};



// (courseServiceImport as any).courseService.getById = async () => courseMock;
// (router as any).useParams = () => ({ id: courseMock.id });

// vi.mock("react-router-dom", async (importOriginal) => {
//   const actual = await importOriginal<typeof import("react-router-dom")>();
//   return {
//     ...actual,
//     useParams: () => ({ id: courseMock.id }),
//   };
// });
// vi.spyOn(router, "useParams").mockReturnValue({ id: courseMock.id });