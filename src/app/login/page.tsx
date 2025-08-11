"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  EyeOff,
  Scissors,
  Lock,
  Mail,
  User,
  LogInIcon,
} from "lucide-react";

function App() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = cadastro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // mensagem sucesso/erro
  const [isLoading, setIsLoading] = useState(false); // estado para bloquear botão e mostrar loading

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // bloqueia múltiplos cliques enquanto está carregando
    setMessage("");
    setIsLoading(true);

    if (isLogin) {
      // LOGIN
      try {
        const res = await fetch(`${API_URL}/usuarios/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!res.ok) {
          const errMsg = await res.text();
          setMessage("Erro no login: " + errMsg);
          setIsLoading(false);
          return;
        }

        router.push("/");
      } catch (error) {
        setMessage("Erro ao conectar com backend no login");
        console.error(error);
        setIsLoading(false);
      }
    } else {
      // CADASTRO
      try {
        const res = await fetch(
          `${API_URL}/usuarios/registrar?linkBaseConfirmacao=${encodeURIComponent(
            "http://localhost:3000/confirmar-email"
          )}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        if (!res.ok) {
          const errMsg = await res.text();
          setMessage("Erro no cadastro: " + errMsg);
          setIsLoading(false);
          return;
        }

        const successMsg = await res.text();
        setMessage(successMsg);
        setFormData({ name: "", email: "", password: "" });
        setIsLogin(true);
        setIsLoading(false);
      } catch (error) {
        setMessage("Erro ao conectar com backend no cadastro");
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  // Spinner simples (círculo giratório) via CSS inline
  const Spinner = () => (
    <svg
      className="animate-spin h-5 w-5 text-white inline-block mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl">
              <Scissors className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Barber Pro</h1>
              <p className="text-yellow-400 font-medium">
                Professional Barbershop
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Transforme seu
              <span className="block text-yellow-400">estilo profissional</span>
            </h2>
            <p className="text-xl text-gray-300">
              Junte-se à comunidade de barbeiros profissionais.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl">
              <Scissors className="w-6 h-6 text-black" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Barber Pro</h1>
              <p className="text-yellow-600 font-medium text-sm">
                Professional Barbershop
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {isLogin
                    ? "Faça login para acessar sua conta"
                    : "Preencha os dados para criar uma conta"}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 flex justify-center items-center"
                  disabled={isLoading}
                >
                  {isLoading && <Spinner />}
                  {isLoading
                    ? isLogin
                      ? "Entrando..."
                      : "Cadastrando..."
                    : isLogin
                    ? "Entrar"
                    : "Cadastrar"}
                </Button>

                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">
                      ou
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-gray-200"
                >
                  <div className="flex items-center gap-3 justify-center">
                    <LogInIcon />
                    Continuar com Google
                  </div>
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              <div className="w-full text-center">
                {isLogin ? (
                  <p>
                    Não tem uma conta?
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(false);
                        setMessage("");
                        setFormData({ name: "", email: "", password: "" });
                      }}
                      className="ml-2 text-yellow-600"
                    >
                      Criar conta
                    </button>
                  </p>
                ) : (
                  <p>
                    Já tem uma conta?
                    <button
                      type="button"
                      onClick={() => {
                        setIsLogin(true);
                        setMessage("");
                        setFormData({ name: "", email: "", password: "" });
                      }}
                      className="ml-2 text-yellow-600"
                    >
                      Fazer login
                    </button>
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>

          {message && (
            <p
              className={`mt-4 max-w-md mx-auto text-center ${
                message.toLowerCase().includes("erro")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
