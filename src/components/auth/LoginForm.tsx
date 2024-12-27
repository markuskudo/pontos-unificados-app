import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  selectedRole?: 'customer' | 'merchant' | null;
}

export const LoginForm = ({ selectedRole = null }: LoginFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Erro no login",
          description: "E-mail ou senha incorretos",
          variant: "destructive",
        });
        return;
      }

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile) {
          // Check if the user's role matches the selected role
          if (selectedRole && profile.role !== selectedRole) {
            toast({
              title: "Acesso negado",
              description: `Esta conta não está registrada como ${selectedRole === 'customer' ? 'cliente' : 'lojista'}`,
              variant: "destructive",
            });
            // Sign out the user since they tried to log in with the wrong role
            await supabase.auth.signOut();
            return;
          }

          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo(a) de volta!",
          });

          // Redirect based on user role
          switch (profile.role) {
            case "merchant":
              navigate("/merchant");
              break;
            case "admin":
              navigate("/admin");
              break;
            default:
              navigate("/customer");
          }
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </form>
  );
};