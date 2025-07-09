import { Button } from "@/components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import LinkPage from "./pages/LinkPage";
import RedirectLink from "./pages/RedirectLink";
import './App.css';

const router = createBrowserRouter([
  {
    element:<Layout />,
    children:[
      {
        path:"/",
        element: <Landing />
      },
      {
        path:"/dashboard",
        element: <Dashboard />
      },
      {
        path:"/auth",
        element: <Auth />
      },
      {
        path:"/link/:id",
        element: <LinkPage />
      },
      {
        path:"/:id",
        element: <RedirectLink />
      },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
