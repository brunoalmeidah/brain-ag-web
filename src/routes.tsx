import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { NotFound } from "./pages/404";
import { Producers } from "./pages/app/producers/producers";
import { ProducerForm } from "./pages/app/producers/producer-form";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/produtores", element: <Producers /> },
      { path: "/produtores/novo", element: <ProducerForm /> },
      { path: "/produtores/:id", element: <ProducerForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
