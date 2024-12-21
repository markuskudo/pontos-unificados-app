import { RegisterForm } from "@/components/auth/RegisterForm";

const Index = () => {
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

        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Criar Nova Conta
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Index;