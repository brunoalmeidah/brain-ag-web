import { Button } from "./components/ui/button";
import { ThemeProvider } from "@/components/theme/theme-provider";
import "./global.css";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="brain-ag-ui-theme">
      <div className="w-full flex justify-center">
        <div>
          <Button>Click me</Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
