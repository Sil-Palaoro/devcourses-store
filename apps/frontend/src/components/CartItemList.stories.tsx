import type { Meta, StoryObj } from '@storybook/react-vite';
import CartItemList from './CartItemList';
import { cartItemsMock } from "../mocks/cart-mock";
import { fn } from "storybook/test";


const meta = {
  title: 'Components/CartItemList',
  component: CartItemList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CartItemList>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        cartItems: cartItemsMock,
        onRemoveItem: fn(),
    }
};