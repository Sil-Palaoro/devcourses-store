// import * as ReactRouterDom from "react-router-dom";
// Object.defineProperty(ReactRouterDom, "useParams", {
//   value: () => ({ id: "mocked-course-id"})
// })

import type { Preview } from '@storybook/react-vite';
import { AuthProvider } from "../src/contexts/AuthContext";
import { AuthModalProvider } from "../src/contexts/AuthModalContext";
import { CartProvider } from "../src/contexts/CartContext";
import { MemoryRouter } from "react-router-dom";
import "../src/styles/App.css";

// // ⚡ mock dinámico de useParams, seguro para Storybook
// import * as ReactRouterDom from "react-router-dom";

// // Evitamos redefinir si ya existe o si Storybook recompila
// if (typeof ReactRouterDom.useParams === "function") {
//   // Creamos un mock seguro sin romper la propiedad
//   ReactRouterDom.useParams = () => ({ id: "mocked-course-id" });
// }

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <AuthProvider>
          <AuthModalProvider>          
            <CartProvider>
              <Story />
            </CartProvider>
          </AuthModalProvider>
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;