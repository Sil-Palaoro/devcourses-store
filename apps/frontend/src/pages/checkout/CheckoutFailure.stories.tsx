import { Meta, StoryObj } from "@storybook/react-vite";
import CheckoutFailure from "./CheckoutFailure";
import { MockAuthProvider } from "../../mocks/MockAuthProvider";
import { UserRole } from "@devcourses/domain";
import Layout from "../../components/Layout";


interface ContextArgs {
    isAuthenticated?: boolean;
    userRole?: UserRole;
}

const meta = {
    title: 'Pages/Checkout',
    component: CheckoutFailure,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [
        (Story, context: { args: ContextArgs}) => (
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
        isAuthenticated: true,
        userRole: "student"
  },
} satisfies Meta<typeof CheckoutFailure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckoutFailureDefault: Story = {};
