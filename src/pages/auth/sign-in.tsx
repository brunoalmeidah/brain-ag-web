import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Error } from "@/components/error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/hooks/auth";

const signInForm = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .email("Insira um e-mail válido")
    .min(1, "E-mail é obrigatório"),
  password: z
    .string({ required_error: "Senha é obrigatório" })
    .min(1, "Senha é obrigatório"),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({ resolver: zodResolver(signInForm) });

  const navigate = useNavigate();

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: SignInForm) {
    try {
      await signIn(data);
      navigate("/");
    } catch {
      toast.error("Credenciais inválidas, por favor tente novamente");
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" {...register("email")} />
              <Error message={errors.email?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Senha</Label>
              <Input id="email" type="password" {...register("password")} />
              <Error message={errors.password?.message} />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
