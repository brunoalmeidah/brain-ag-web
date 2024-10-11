import { Home, Tractor } from "lucide-react";

import { NavLink } from "./nav-link";
export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <nav className="lg:space-x6 flex items-center space-x-4">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/produtores">
            <Tractor className="h-4 w-4" />
            Produtores
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
