import { ThemeProvider } from "@/components/theme/theme-provider";
import "./global.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="brain-ag-ui-theme">
        <Helmet titleTemplate="%s | Brain AG" />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
