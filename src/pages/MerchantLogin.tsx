import { LoginForm } from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MerchantLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Login do Lojista
            </h2>
            <LoginForm />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Ainda não tem uma conta?{" "}
                <Link
                  to="/merchant/register"
                  className="text-primary hover:underline"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/">Voltar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantLogin;