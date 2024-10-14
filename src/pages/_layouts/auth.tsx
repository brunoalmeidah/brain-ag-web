import { Outlet } from "react-router-dom";

import logo from "@/assets/logo.png";
export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex h-full flex-col items-center justify-center">
          <img src={logo} alt="Brain ag" />
        </div>
        <footer className="text-sm">
          &copy; Brain Ag - {new Date().getFullYear()}
        </footer>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
