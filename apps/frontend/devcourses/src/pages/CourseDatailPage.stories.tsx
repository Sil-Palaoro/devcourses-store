import { Meta, StoryObj, StoryContext } from "@storybook/react-vite";
import type { ReactRenderer } from "@storybook/react";
import CourseDetailPage from "./CourseDetailPage.js";
import { fn } from "storybook/test";
import Layout from "../components/Layout.js";
import { MockAuthProvider } from "../mocks/MockAuthProvider.js";
import { UserRole, Course } from "@devcourses/domain";

interface ContextArgs {
    isAuthenticated?: boolean;
    userRole?: UserRole;
}

interface StoryArgs extends ContextArgs {
    course: Course
}

const meta = {
    title: 'Pages/CourseDetailPage',
    component: CourseDetailPage,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        (Story, context: StoryContext<StoryArgs>) => (
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
//   args: { onClick: fn() },
} satisfies Meta<typeof CourseDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
       course: {
        id: "2",
        title: "Python nivel intermedio",
        description: "Aprende Python nivel intermedio - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet orci elementum tellus vulputate sodales. Cras ornare elementum ullamcorper. Etiam ligula elit, mollis vitae tempor ac, varius ullamcorper mauris. ",
        price: 30000,
        categoryId: "2",
        courseLevel: "intermediate",
        published: true,
        instructorId: "1",
        tag: "python"
        },
        isAuthenticated: false,
    },
};

