import type { Meta, StoryObj } from '@storybook/react-vite';
import CartItemCard from './CartItemCard';
import { fn } from "storybook/test";


const meta = {
  title: 'Components/CartItemCard',
  component: CartItemCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        onRemoveItem: fn(),
        cartItem: {
        id: "1",
        cartId: "3",
        courseId: "2",
        quantity: 1,
        priceSnapshot: 25000
    }
    }
};