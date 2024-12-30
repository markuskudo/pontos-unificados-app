import { LoginForm } from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CustomerLogin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para início
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold">Login do Cliente</h1>
            <p className="text-gray-600 mt-2">
              Entre na sua conta para acessar seus pontos e benefícios
            </p>
          </div>
        </div>

        <LoginForm />

        <p className="text-center text-sm text-gray-500">
          Não tem uma conta?{" "}
          <Link to="/customer/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CustomerLogin;