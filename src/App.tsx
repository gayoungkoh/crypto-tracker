import { Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>
  );
};

export default App;
