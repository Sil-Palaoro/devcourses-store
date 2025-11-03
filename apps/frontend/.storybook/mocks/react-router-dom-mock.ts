// // .storybook/mocks/react-router-dom-mock.ts
// import * as ReactRouterDom from "react-router-dom";

// // devolvemos todo el módulo original
// export const actualReactRouterDom = { ...ReactRouterDom };

// // mockeamos solo useParams()
// export const mockedUseParams = () => ({ id: "mocked-course-id" });

// // exportamos un objeto igual al módulo original pero con el mock aplicado
// export default {
//   ...ReactRouterDom,
//   useParams: mockedUseParams,
// };

// mock completo, sin romper tipos ni hooks de React Router
import * as ReactRouterDom from "react-router-dom";

export const useParams = () => ({ id: "mocked-course-id" });

// Exportamos todo lo demás sin tocar nada
export const MemoryRouter = ReactRouterDom.MemoryRouter;
export const Link = ReactRouterDom.Link;
export const Navigate = ReactRouterDom.Navigate;
export const Outlet = ReactRouterDom.Outlet;
export const useNavigate = ReactRouterDom.useNavigate || (() => () => {});
export const useLocation = ReactRouterDom.useLocation || (() => ({ pathname: "/" }));

// export default con todo
export default {
  ...ReactRouterDom,
  useParams,
};
