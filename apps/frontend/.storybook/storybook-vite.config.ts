import { mergeConfig } from "vite";
import path from "path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    // "@storybook/addon-links",
    // "@storybook/addon-essentials",
    // "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  viteFinal: async (config, { configType }) => {
    // 🔧 Aquí puedes personalizar el build de Vite para Storybook
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
        },
      },
    });
  },
  docs: {
    defaultName: "Documentation",
  },
};

export default config;


// import { mergeConfig } from 'vite';
// import path from 'path';
// import type { StorybookConfig } from '@storybook/react-vite';

// const config: StorybookConfig = {
//   viteFinal: async (config) => {
//     return mergeConfig(config, {
//       resolve: {
//         alias: {
//           // 👉 cada vez que react-router-dom sea importado,
//           // usa nuestro mock en su lugar
//           'react-router-dom': path.resolve(__dirname, './react-router-dom-mock.ts'),
//         },
//       },
//     });
//   },
// };

// export default config;
