import { Meta, StoryObj } from "@storybook/react-vite";
import CourseDetailPage from "./CourseDetailPage.js";
import Layout from "../components/Layout.js";
import { MockAuthProvider } from "../mocks/MockAuthProvider.js";
import { UserRole, Course } from "@devcourses/domain";
// import * as ButtonStories from "../components/Button.stories.js";


const courseMock: Course = {
    id: "2",
    title: "Python nivel intermedio",
    description: "Aprende Python nivel intermedio - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet orci elementum tellus vulputate sodales. Cras ornare elementum ullamcorper. Etiam ligula elit, mollis vitae tempor ac, varius ullamcorper mauris. ",
    price: 30000,
    categoryId: "2",
    courseLevel: "intermediate",
    published: true,
    instructorId: "1",
    tag: "python"
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
    args: {
        course: courseMock,
    },
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

// export const CourseDetailPageLoadingButton: Story = {
//     args: {
//         isAuthenticated: false,
//         ...ButtonStories.AddingToCart.args,
//     },
// };
