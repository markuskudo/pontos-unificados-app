import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, Users, Star } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [selectedRole, setSelectedRole] = useState<'customer' | 'merchant' | null>(null);

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
          {!selectedRole ? (
            <Card className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">Escolha seu perfil</h2>
              <div className="grid gap-4">
                <Button 
                  size="lg"
                  className="w-full"
                  onClick={() => setSelectedRole('customer')}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Entrar como Cliente
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedRole('merchant')}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Entrar como Lojista
                </Button>
              </div>
            </Card>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {selectedRole === 'customer' ? 'Área do Cliente' : 'Área do Lojista'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRole(null)}
                >
                  Voltar
                </Button>
              </div>
              <LoginForm selectedRole={selectedRole} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;