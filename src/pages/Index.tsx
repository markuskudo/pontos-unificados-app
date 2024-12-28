import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { CustomerRegisterForm } from "@/components/auth/CustomerRegisterForm";
import { MerchantRegisterForm } from "@/components/auth/MerchantRegisterForm";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [registerType, setRegisterType] = useState<"customer" | "merchant" | null>(
    null
  );

  const handleBackToOptions = () => {
    setRegisterType(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Programa de Fidelidade Unificado
          </h1>
          <p className="text-lg text-gray-600">
            Acumule pontos em diversas lojas e aproveite benefícios exclusivos
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-4 mb-6">
            <Button
              variant={showLogin ? "default" : "outline"}
              className="flex-1"
              onClick={() => {
                setShowLogin(true);
                setRegisterType(null);
              }}
            >
              Login
            </Button>
            <Button
              variant={!showLogin ? "default" : "outline"}
              className="flex-1"
              onClick={() => {
                setShowLogin(false);
                setRegisterType(null);
              }}
            >
              Criar Conta
            </Button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {showLogin
                ? "Entrar"
                : registerType
                ? `Criar Conta ${
                    registerType === "merchant" ? "Lojista" : "Cliente"
                  }`
                : "Escolha o tipo de conta"}
            </h2>

            {showLogin ? (
              <LoginForm />
            ) : registerType === null ? (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setRegisterType("customer")}
                >
                  Sou Cliente
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setRegisterType("merchant")}
                >
                  Sou Lojista
                </Button>
              </div>
            ) : registerType === "customer" ? (
              <div>
                <CustomerRegisterForm />
                <Button
                  variant="link"
                  className="mt-4 w-full"
                  onClick={handleBackToOptions}
                >
                  Voltar
                </Button>
              </div>
            ) : (
              <div>
                <MerchantRegisterForm />
                <Button
                  variant="link"
                  className="mt-4 w-full"
                  onClick={handleBackToOptions}
                >
                  Voltar
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;