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

export default function ConfirmarEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [countdown, setCountdown] = useState(5);
  const [isAnimating, setIsAnimating] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("Confirmando seu email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token não encontrado na URL.");
      return;
    }
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // Chama o backend para confirmar o token
    fetch(`${API_URL}/usuarios/confirmar?token=${encodeURIComponent(token)}`)
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">{message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-golden-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          {status === "success" ? (
            <div
              className={`relative ${
                isAnimating ? "animate-bounce-in" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-golden-500 rounded-full animate-golden-glow opacity-30"></div>
              <CheckCircle
                className="w-20 h-20 text-golden-600 relative z-10 drop-shadow-lg"
                strokeWidth={1.5}
              />
            </div>
          ) : (
            <div className="relative animate-shake">
              <XCircle
                className="w-20 h-20 text-red-600 relative z-10 drop-shadow-lg"
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>

        <Card
          className={`shadow-xl border-2 ${
            status === "success"
              ? "border-golden-400/40 bg-white/95"
              : "border-red-400/40 bg-white/90"
          } backdrop-blur-sm ${
            isAnimating ? "animate-slide-up" : "opacity-0 translate-y-5"
          }`}
        >
          <CardHeader className="text-center pb-4">
            <CardTitle
              className={`text-3xl font-bold ${
                status === "success" ? "text-golden-700" : "text-red-600"
              } mb-2`}
            >
              {status === "success"
                ? "Email Confirmado!"
                : "Erro na confirmação"}
            </CardTitle>
            <CardDescription className="text-gray-700 text-base leading-relaxed">
              {message}
            </CardDescription>
          </CardHeader>

          {status === "success" && (
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center space-x-3 p-4 bg-golden-100/80 rounded-lg border border-golden-300/40">
                <Mail className="w-5 h-5 text-golden-600" />
                <span className="text-golden-800 font-medium">
                  Verificação concluída com sucesso
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2 p-3 bg-gray-100/80 rounded-lg border border-gray-300">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 text-sm">
                  Redirecionando em{" "}
                  <span className="font-bold text-golden-600">{countdown}</span>{" "}
                  segundos
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-golden-500 to-golden-400 h-2 rounded-full transition-all duration-1000 ease-linear shadow-sm"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          )}

          <CardFooter className="flex flex-col space-y-3 pt-4">
            <Button
              onClick={handleRedirect}
              className={`w-full ${
                status === "success"
                  ? "bg-gradient-to-r from-golden-500 to-golden-400 hover:from-golden-600 hover:to-golden-500 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              } font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200`}
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir para Página Inicial
            </Button>

            {status === "success" && (
              <p className="text-xs text-gray-600 text-center leading-relaxed">
                Você será redirecionado automaticamente ou pode clicar no botão
                acima para continuar imediatamente.
              </p>
            )}
          </CardFooter>
        </Card>

        <div
          className={`mt-8 text-center ${
            isAnimating ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <p
            className={`${
              status === "success" ? "text-golden-700" : "text-red-600"
            } text-sm font-medium`}
          >
            Bem-vindo ao Barber Pro! ✂️
          </p>
        </div>
      </div>
    </div>
  );
}
