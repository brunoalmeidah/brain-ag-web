import { Header } from "@/components/header";
import { AuthContext } from "@/hooks/auth";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {
  const navigate = useNavigate();
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header userName={user.name} onSignOut={signOut} />
      <div className="flex flex-1 flex-col gap-4 p-8  pt-6">
        <Outlet />
      </div>
    </div>
  );
}
