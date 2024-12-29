import { MerchantLoginForm } from "@/components/auth/MerchantLoginForm";
import { Link } from "react-router-dom";

const MerchantLogin = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Login do Lojista</h1>
          <p className="text-muted-foreground">
            Acesse sua conta para gerenciar sua loja
          </p>
        </div>

        <MerchantLoginForm />

        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link to="/merchant/register" className="text-primary hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
          <Link to="/" className="text-sm text-primary hover:underline block">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchantLogin;