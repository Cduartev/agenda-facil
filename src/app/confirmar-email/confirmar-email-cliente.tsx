"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Home, Mail, Clock, XCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConfirmarEmailClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [countdown, setCountdown] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("Confirmando seu email...");

  // Confirmação do email
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token não encontrado na URL.");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/confirmar?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao confirmar email.");
        }
        return res.text();
      })
      .then((text) => {
        setStatus("success");
        setMessage(text || "Email confirmado com sucesso!");
        setTimeout(() => setIsAnimating(true), 100);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.message || "Erro ao confirmar email.");
      });
  }, [token]);

  // Countdown e redirecionamento automático
  useEffect(() => {
    if (status !== "success") return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  const handleRedirect = () => {
    window.location.href = "/";
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
        <p className="text-lg">{message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4 text-gray-200">
      <div className="w-full max-w-md">
        {/* Ícone de status */}
        <div className="flex justify-center mb-8">
          {status === "success" ? (
            <div className={`relative ${isAnimating ? "animate-bounce-in" : "opacity-0"}`}>
              <div className="absolute inset-0 bg-yellow-500 rounded-full animate-ping opacity-20"></div>
              <CheckCircle
                className="w-20 h-20 text-yellow-400 relative z-10 drop-shadow-lg"
                strokeWidth={1.5}
              />
            </div>
          ) : (
            <div className="relative animate-shake">
              <XCircle
                className="w-20 h-20 text-red-500 relative z-10 drop-shadow-lg"
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>

        {/* Card principal */}
        <Card
          className={`shadow-2xl border-2 ${
            status === "success"
              ? "border-yellow-400/50 bg-gray-800/90"
              : "border-red-500/50 bg-gray-800/90"
          } backdrop-blur-sm ${isAnimating ? "animate-slide-up" : "opacity-0 translate-y-5"}`}
        >
          <CardHeader className="text-center pb-4">
            <CardTitle
              className={`text-3xl font-bold ${
                status === "success" ? "text-yellow-400" : "text-red-500"
              } mb-2`}
            >
              {status === "success" ? "Email Confirmado!" : "Erro na confirmação"}
            </CardTitle>
            <CardDescription className="text-gray-300 text-base leading-relaxed">
              {message}
            </CardDescription>
          </CardHeader>

          {/* Conteúdo do Card */}
          {status === "success" && (
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center space-x-3 p-4 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 font-medium">
                  Verificação concluída com sucesso
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2 p-3 bg-gray-700/60 rounded-lg border border-gray-600/40">
                <Clock className="w-4 h-4 text-gray-300" />
                <span className="text-gray-300 text-sm">
                  Redirecionando em{" "}
                  <span className="font-bold text-yellow-400">{countdown}</span> segundos
                </span>
              </div>

              <div className="w-full bg-gray-600/40 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full transition-all duration-1000 ease-linear shadow-sm"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                />
              </div>
            </CardContent>
          )}

          <CardFooter className="flex flex-col space-y-3 pt-4">
            <Button
              onClick={handleRedirect}
              className={`w-full ${
                status === "success"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-gray-900"
                  : "bg-red-500 hover:bg-red-600 text-white"
              } font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200`}
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir para Página Inicial
            </Button>

            {status === "success" && (
              <p className="text-xs text-gray-300 text-center leading-relaxed">
                Você será redirecionado automaticamente ou pode clicar no botão acima para continuar
                imediatamente.
              </p>
            )}
          </CardFooter>
        </Card>

        {/* Mensagem de boas-vindas */}
        <div className={`mt-8 text-center ${isAnimating ? "animate-fade-in" : "opacity-0"}`}>
          <p
            className={`${
              status === "success" ? "text-yellow-400" : "text-red-500"
            } text-sm font-medium`}
          >
            Bem-vindo ao Barber Pro! ✂️
          </p>
        </div>
      </div>
    </div>
  );
}