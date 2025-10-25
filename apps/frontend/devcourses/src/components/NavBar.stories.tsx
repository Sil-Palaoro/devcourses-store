import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import NavBar from "./NavBar";
import { MockAuthProvider } from "../mocks/MockAuthProvider";


const meta = {
    title: 'Components/NavBar',
    component: NavBar,    
    tags: ['autodocs'],
    decorators: [
      (Story) => (
        <MockAuthProvider>
            <Story />
        </MockAuthProvider>
      )
    ],
    parameters: {
        layout: 'fullscreen',
      },
      // args: {
      //   onLogin: fn(),
      //   onLogout: fn(),
      //   onCreateAccount: fn(),
      // },

} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;


export const LoggedInStudent: Story = {
  decorators: [
     (Story) => (
        <MockAuthProvider
        isAuthenticated={true}
        userRole="student" 
        >
            <Story />
        </MockAuthProvider>
      ) 
  ],
};

export const LoggedInInstructor: Story = {
  decorators: [
     (Story) => (
        <MockAuthProvider
        isAuthenticated={true}
        userRole="instructor"
        >
            <Story />
        </MockAuthProvider>
      ) 
  ],
};

export const AdminLoggedIn: Story = {
  decorators: [
     (Story) => (
        <MockAuthProvider
        isAuthenticated={true}
        userRole="admin"
        >
            <Story />
        </MockAuthProvider>
      ) 
  ],
};

export const LoggedOut: Story = {};

