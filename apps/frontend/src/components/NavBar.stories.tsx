import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import NavBar from "./NavBar.js";
import { MockAuthProvider } from "../mocks/MockAuthProvider.js";
import * as ButtonStories from "./Button.stories.js";


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
      args: {
        onClick: fn(),
      },
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
  args: {
    ...ButtonStories.LoggedIn.args,
  }
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
  args: {
    ...ButtonStories.LoggedIn.args,
  }
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
  args: {
    ...ButtonStories.LoggedIn.args,
  }
};

export const LoggedOut: Story = {
  args: {
    ...ButtonStories.LoggedOut.args,
  }
};
