import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if there's an active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // Redirect based on user role
        const userRole = session.user.user_metadata.role || 'customer';
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
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo(a) de volta!",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  if (session) {
    return null; // User will be redirected by the useEffect
  }

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
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(var(--color-primary))',
                      brandAccent: 'rgb(var(--color-primary))',
                    },
                  },
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