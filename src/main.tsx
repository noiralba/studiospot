import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.tsx'

import './styles/_index.css'
import routes from './routes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes
  }
]);

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
