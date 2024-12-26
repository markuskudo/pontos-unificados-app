import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Users, Star } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

  useEffect(() => {
    if (session) {
      const userRole = session.user.user_metadata.role || 'customer';
      console.log("Session found, redirecting based on role:", userRole);
      
      switch (userRole) {
        case 'merchant':
          navigate('/merchant');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/customer');
      }
    }
  }, [session, navigate]);

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
            Programa de Fidelidade Unificado
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acumule pontos em diversas lojas e aproveite benefícios exclusivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Para Lojistas</h3>
            <p className="text-gray-600">
              Fidelize seus clientes e aumente suas vendas com nosso programa
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Para Clientes</h3>
            <p className="text-gray-600">
              Acumule pontos em várias lojas com um único cadastro
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Benefícios</h3>
            <p className="text-gray-600">
              Descontos exclusivos e vantagens especiais em todas as lojas
            </p>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#6D28D9',
                      brandAccent: '#5B21B6',
                      brandButtonText: 'white',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      inputBorderRadius: '8px',
                    },
                  },
                },
                className: {
                  button: 'bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors',
                  input: 'rounded-lg border-gray-300 focus:border-primary focus:ring-primary',
                  label: 'text-gray-700 font-medium',
                },
              }}
              providers={[]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Criar conta',
                    loading_button_label: 'Criando conta...',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;