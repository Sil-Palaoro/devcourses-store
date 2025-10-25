import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    isAuthenticated: false,
    label: 'Ingresar',
    disabled: false,
  },
};

export const LoggedIn: Story = {
  args: {
    isAuthenticated: true,
    label: 'Cerrar sesión',
    disabled: false,
  },
};

export const LoginIn: Story = {
  args: {
    isLoading: true,
    label: 'Ingresando..',
    disabled: true,
  },
};

export const Register: Story = {
  args: {
    isLoading: false,
    label: 'Registrarme',
    disabled: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    label: 'Cargando..',
    disabled: true,
  },
};

