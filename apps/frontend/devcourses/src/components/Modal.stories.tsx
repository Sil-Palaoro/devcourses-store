import { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import Login from "../features/auth/login";
import Register from "../features/auth/register";

const meta = {
    title: "Components/Modal",
    component: Modal,
    parameters: {
        layout: "centered"
    },
    tags: ['autodocs'],
    args: {
        onClose: ()=> alert("Modal cerrado"),
    }
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>

export const LoginModal: Story = {
    args: {
        title: "Iniciar sesión", 
        isOpen: true, 
        children: <Login />
    }
}

export const RegisterModal: Story = {
    args: {
        title: "Registro", 
        isOpen: true, 
        children: <Register />
    }
}
