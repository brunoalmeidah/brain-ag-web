export interface SignInBody {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export async function authenticate({
  email,
  password,
}: SignInBody): Promise<SignInResponse> {
  if (email === "teste@email.com" && password === "123456") {
    return Promise.resolve({
      token: "tokenteste",
      user: { id: "1", name: "Usuário" },
    });
  }
  throw new Error("Credenciais inválidas");
}
