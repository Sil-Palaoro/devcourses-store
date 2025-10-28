import { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Home from "./Home";
import Layout from "../components/Layout";
import { MockAuthProvider } from "../mocks/MockAuthProvider";
import { UserRole } from "@devcourses/domain";

interface ContextArgs {
    isAuthenticated?: boolean;
    userRole?: UserRole;
}

const meta = {
    title: 'Components/Home',
    component: Home,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        (Story, context: { args: ContextArgs }) => (
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
       onClick: fn(),
    },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeLoggedOut: Story = {
  args: {
    isAuthenticated: false,
  }
};

export const HomeLoggedInStudent: Story = {
  args: {
    isAuthenticated: true,
    userRole: "student"
  }
};

export const HomeLoggedInInstructor: Story = {
  args: {
    isAuthenticated: true,
    userRole: "instructor",
  }
};

export const HomeLoggedInAdmin: Story = {
  args: {
    isAuthenticated: true,
    userRole: "admin"
  }
};