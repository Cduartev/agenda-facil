"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Scissors, Lock, Mail, User, LogInIcon } from 'lucide-react';

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação senha confirmada no cadastro
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("As senhas não conferem");
      return;
    }

    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/signup"; // Ajuste esse endpoint conforme backend

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: isLogin ? formData.email : formData.name, // Ajuste conforme backend
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // Para cookies (JWT, sessão)
      });

      if (!res.ok) {
        const errMsg = await res.text();
        alert("Erro: " + errMsg);
        return;
      }

      const data = await res.text();
      alert(data);

      if (isLogin) {
        // Redirecionar após login para página protegida, ex:
        window.location.href = "/dashboard";
      } else {
        // Depois de criar conta, volta para login
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      }
    } catch (error) {
      alert("Erro ao conectar com backend");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        {/* Overlay content */}
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl">
              <Scissors className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Barber Pro</h1>
              <p className="text-yellow-400 font-medium">Professional Barbershop</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Transforme seu
              <span className="block text-yellow-400">estilo profissional</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Junte-se à comunidade de barbeiros profissionais e eleve seu negócio a outro nível.
            </p>
            
            <div className="space-y-4 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Sistema completo de agendamento</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Gestão de clientes e serviços</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Relatórios financeiros detalhados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl">
              <Scissors className="w-6 h-6 text-black" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Barber Pro</h1>
              <p className="text-yellow-600 font-medium text-sm">Professional Barbershop</p>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Bem-vindo de volta!' : 'Criar conta'}
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {isLogin 
                    ? 'Faça login para acessar sua conta' 
                    : 'Preencha os dados para criar sua conta'}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 h-12 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-600" />
                      <span className="text-sm text-gray-600">Lembrar-me</span>
                    </label>
                    <button type="button" className="text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                      Esqueceu a senha?
                    </button>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  {isLogin ? 'Entrar' : 'Criar conta'}
                </Button>

                <div className="relative">
                  <Separator className="my-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">ou</span>
                  </div>
                </div>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LogInIcon />Continuar com Google
                  </div>
                </Button>
              </form>
            </CardContent>

            <CardFooter>
              <div className="w-full text-center">
                <p className="text-gray-600">
                  {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                  >
                    {isLogin ? 'Criar conta' : 'Fazer login'}
                  </button>
                </p>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Ao continuar, você concorda com nossos{' '}
              <button className="text-yellow-600 hover:text-yellow-700 transition-colors">
                Termos de Serviço
              </button>{' '}
              e{' '}
              <button className="text-yellow-600 hover:text-yellow-700 transition-colors">
                Política de Privacidade
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
