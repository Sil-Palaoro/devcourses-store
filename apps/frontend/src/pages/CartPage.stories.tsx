import { Meta, StoryObj } from "@storybook/react-vite";
import CartPage from "./CartPage";
import { MockAuthProvider } from "../mocks/MockAuthProvider";
import { CartProviderMock } from "../mocks/CartProviderMock";
import { cartItemsMock } from "../mocks/cart-mock";
import { Cart, UserRole } from "@devcourses/domain";
import Layout from "../components/Layout";


interface ContextArgs {
    isAuthenticated?: boolean;
    userRole?: UserRole;
    cart?: Cart | null;
}

const mockCart: Cart = {
    id: "1",
    userId: "123",
    items: cartItemsMock,
    currency: "ARS",
};


const meta = {
    title: 'Pages/CartPage',
    component: CartPage,
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
                <CartProviderMock cart={context.args.cart}>
                    <Layout>
                        <Story />
                    </Layout>                    
                </CartProviderMock>
            </MockAuthProvider>
        )
    ],
    args: {
        isAuthenticated: true,
        userRole: "student"
  },
} satisfies Meta<typeof CartPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CartPageEmpty: Story = {};

export const CartPageWithItems: Story = {
    args: {
        cart: mockCart,
    },
};