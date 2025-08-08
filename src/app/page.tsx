"use client";
import React, { useState, FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Scissors,
  Menu,
  X,
  Calendar,
  Clock,
  MapPin,
  Search,
  CreditCard,
  CheckCircle,
  Phone,
  Mail,
  Star,
  Shield,
  Droplets,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
  recaptchaToken: string | null;
};

function App() {
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
    recaptchaToken: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const services = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Corte de Cabelo",
      description:
        "Cortes modernos e clássicos executados por profissionais experientes",
      price: "A partir de R$ 25",
    },
    {
      icon: <Scissors className="h-8 w-8 rotate-45" />,
      title: "Barba & Bigode",
      description:
        "Modelagem e cuidados especiais para sua barba ficar perfeita",
      price: "A partir de R$ 20",
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "Tratamentos",
      description:
        "Hidratação capilar, máscaras e tratamentos para cabelo e barba",
      price: "A partir de R$ 30",
    },
  ];

  const features = [
    {
      icon: <Star className="h-6 w-6" />,
      title: "Profissionais Qualificados",
      description: "Barbeiros certificados e com experiência comprovada",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horários Flexíveis",
      description: "Agendamento disponível 7 dias por semana",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Ambiente Seguro",
      description: "Protocolos de higiene e segurança rigorosamente seguidos",
    },
  ];

  const steps = [
    {
      icon: <Search className="h-12 w-12" />,
      title: "Encontre sua barbearia",
      description:
        "Pesquise por barbearias na sua região e veja avaliações, fotos e serviços disponíveis.",
      step: "01",
    },
    {
      icon: <Calendar className="h-12 w-12" />,
      title: "Escolha data e horário",
      description:
        "Selecione o dia e horário que melhor se adequa à sua agenda. Veja a disponibilidade em tempo real.",
      step: "02",
    },
    {
      icon: <CreditCard className="h-12 w-12" />,
      title: "Confirme seu agendamento",
      description:
        "Finalize seu agendamento de forma segura. Você pode pagar online ou na barbearia.",
      step: "03",
    },
    {
      icon: <CheckCircle className="h-12 w-12" />,
      title: "Compareça e relaxe",
      description:
        "Chegue no horário marcado e desfrute do melhor atendimento. Receba lembretes automáticos.",
      step: "04",
    },
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validação: campos não podem ser apenas espaços
    if (!formData.nome.trim()) {
      setError("O nome não pode estar vazio ou conter apenas espaços.");
      return;
    }
    if (!formData.email.trim()) {
      setError("O e-mail não pode estar vazio ou conter apenas espaços.");
      return;
    }
    if (!formData.telefone.trim()) {
      setError("O telefone não pode estar vazio ou conter apenas espaços.");
      return;
    }
    if (!formData.assunto.trim()) {
      setError("O assunto não pode estar vazio ou conter apenas espaços.");
      return;
    }
    if (!formData.mensagem.trim()) {
      setError("A mensagem não pode estar vazia ou conter apenas espaços.");
      return;
    }

    if (!formData.recaptchaToken) {
      setError("Por favor, marque a caixa 'Não sou um robô'");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8080/contato", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          telefone: formData.telefone.trim(),
          assunto: formData.assunto.trim(),
          mensagem: formData.mensagem.trim(),
          recaptchaToken: formData.recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Erro ao enviar mensagem");
      }

      setSuccess(data.message);
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
        recaptchaToken: null,
      });

      recaptchaRef.current?.reset();
    } catch (err) {
      setError((err as Error).message);
      recaptchaRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-900">
                BarberPro
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#inicio"
                className="text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Início
              </a>
              <a
                href="#servicos"
                className="text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Serviços
              </a>
              <a
                href="#como-funciona"
                className="text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Como Funciona
              </a>
              <a
                href="#contato"
                className="text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Contato
              </a>
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                Agendar Agora
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-yellow-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4 mt-4">
                <a
                  href="#inicio"
                  className="text-gray-700 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </a>
                <a
                  href="#servicos"
                  className="text-gray-700 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </a>
                <a
                  href="#como-funciona"
                  className="text-gray-700 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Como Funciona
                </a>
                <a
                  href="#contato"
                  className="text-gray-700 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </a>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full">
                  Agendar Agora
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Agende seu
                  <span className="text-yellow-400 block">corte perfeito</span>
                  online
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  A plataforma mais completa para agendar serviços de barbearia.
                  Encontre os melhores profissionais da sua região e marque seu
                  horário em segundos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-6 text-lg"
                >
                  Agendar Agora
                </Button>
                <Button
                  size="lg"
                  className="text-white bg-yellow-600 hover:bg-yellow-700 hover:text-black px-8 py-6 text-lg"
                >
                  Sou Barbeiro
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">500+</div>
                  <div className="text-gray-400 text-sm">Barbearias</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">24/7</div>
                  <div className="text-gray-400 text-sm">Disponível</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    Rápido
                  </div>
                  <div className="text-gray-400 text-sm">Agendamento</div>
                </div>
              </div>
            </div>

            {/* Right Content - Booking Preview Card */}
            <div className="lg:pl-8">
              <Card className="p-6 bg-white text-black shadow-2xl">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-center">
                    Agendamento Rápido
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-medium">Localização</div>
                        <div className="text-sm text-gray-600">
                          Escolha sua região
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-medium">Data</div>
                        <div className="text-sm text-gray-600">
                          Selecione o dia
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-medium">Horário</div>
                        <div className="text-sm text-gray-600">
                          Escolha a hora
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-6">
                    Encontrar Barbearias
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Services Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Serviços
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços de barbearia com a
              qualidade que você merece, na comodidade do agendamento online.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-yellow-600 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="text-lg font-semibold text-yellow-600">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
              Por que escolher nossa plataforma?
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-yellow-600">{feature.icon}</div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Agendar seu corte nunca foi tão fácil. Siga estes simples passos e
              tenha acesso aos melhores barbeiros da sua região.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="absolute -top-4 -right-4 bg-yellow-600 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                        {step.step}
                      </div>
                      <div className="text-yellow-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-yellow-200 transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold mb-4">Pronto para começar?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de clientes que já descobriram a praticidade
                de agendar online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg font-semibold">
                  Fazer Primeiro Agendamento
                </Button>
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 text-lg font-semibold">
                  Cadastrar Barbearia
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tem dúvidas? Precisa de ajuda? Nossa equipe está pronta para
              atender você da melhor forma possível.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Informações de Contato
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Telefone</h4>
                      <p className="text-gray-600">(11) 99999-9999</p>
                      <p className="text-sm text-gray-500">
                        Segunda a Sexta, 9h às 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">contato@barberpro.com.br</p>
                      <p className="text-sm text-gray-500">
                        Resposta em até 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Endereço</h4>
                      <p className="text-gray-600">São Paulo, SP</p>
                      <p className="text-sm text-gray-500">
                        Atendemos toda a região
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Horário de Funcionamento
                      </h4>
                      <p className="text-gray-600">Plataforma 24/7</p>
                      <p className="text-sm text-gray-500">
                        Suporte: Seg-Sex, 9h às 18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <CardContent className="p-0">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Por que nos escolher?
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        500+
                      </div>
                      <div className="text-sm text-gray-600">
                        Barbearias Parceiras
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        4.8★
                      </div>
                      <div className="text-sm text-gray-600">
                        Avaliação Média
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        24/7
                      </div>
                      <div className="text-sm text-gray-600">
                        Plataforma Online
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">
                        Grátis
                      </div>
                      <div className="text-sm text-gray-600">Para Clientes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Envie sua Mensagem
                </h3>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <Input
                        name="nome"
                        placeholder="Seu nome completo"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <Input
                      name="telefone"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <Input
                      name="assunto"
                      placeholder="Como podemos ajudar?"
                      value={formData.assunto}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem *
                    </label>
                    <Textarea
                      name="mensagem"
                      placeholder="Descreva sua dúvida ou sugestão..."
                      rows={5}
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LfxFp4rAAAAABcLVq170PCbM4hdQU6M1SDZob3j"
                      onChange={(token) =>
                        setFormData({ ...formData, recaptchaToken: token })
                      }
                      onExpired={() => {
                        setFormData({ ...formData, recaptchaToken: null });
                        setError(
                          "A verificação expirou. Por favor, marque novamente a caixa."
                        );
                      }}
                      hl="pt-BR"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-6 text-lg"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Enviar Mensagem"}
                  </Button>

                  {error && <p className="text-red-600 mt-2">{error}</p>}
                  {success && (
                    <p className="text-green-600 mt-2">
                      Mensagem enviada com sucesso!
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Scissors className="h-8 w-8 text-yellow-400" />
                <span className="text-2xl font-bold">BarberPro</span>
              </div>
              <p className="text-gray-400">
                A plataforma líder em agendamentos online para barbearias.
                Conectamos você aos melhores profissionais da sua região.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Corte de Cabelo
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Barba & Bigode
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Tratamentos Capilares
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Relaxamento
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Produtos Premium
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Sobre Nós
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Seja Parceiro
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Carreiras
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Imprensa
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Blog
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Central de Ajuda
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Como Agendar
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Políticas
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Termos de Uso
                </li>
                <li className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Contato
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 BarberPro. Todos os direitos reservados.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <span className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Política de Privacidade
                </span>
                <span className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Termos de Serviço
                </span>
                <span className="hover:text-yellow-400 cursor-pointer transition-colors">
                  Cookies
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
