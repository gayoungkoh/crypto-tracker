import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
