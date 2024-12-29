import { CustomerRegisterForm } from "@/components/auth/CustomerRegisterForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CustomerRegister = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4">
          <Link
            to="/customer/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para login
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold">Cadastro de Cliente</h1>
            <p className="text-gray-600 mt-2">
              Crie sua conta para começar a acumular pontos em suas compras
            </p>
          </div>
        </div>

        <CustomerRegisterForm />

        <p className="text-center text-sm text-gray-500">
          Já tem uma conta?{" "}
          <Link to="/customer/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerRegister;