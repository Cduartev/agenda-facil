import React, { Suspense } from "react";
import ConfirmarEmailClient from "@/app/confirmar-email/confirmar-email-cliente";

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando confirmação do email...</p>}>
      <ConfirmarEmailClient/>
    </Suspense>
  );
}
