import { ChevronDown, Home, LogOut, Tractor } from "lucide-react";
import logo from "@/assets/logo.png";
import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface IProps {
  userName: string;
  onSignOut: () => void;
}
export function Header({ userName, onSignOut }: IProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src={logo} alt="Sujiro Atacadista" className="h-12 w-25" />
        <Separator orientation="vertical" className="h-12" />
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
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex select-none items-center gap-2"
              >
                {userName}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                className="cursor-pointer text-rose-500 dark:text-rose-400"
                onClick={onSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
