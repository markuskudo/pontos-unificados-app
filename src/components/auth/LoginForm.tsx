import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { db } from "@/db/mockDb";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = db.findUserByEmail(formData.email);
    
    if (user) {
      // Em um ambiente real, verificaríamos a senha com hash
      // Por enquanto, apenas simulamos o login bem-sucedido
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a) ${user.name}!`,
      });

      // Redireciona para o painel apropriado
      switch (user.role) {
        case "customer":
          navigate("/customer");
          break;
        case "merchant":
          navigate("/merchant");
          break;
        case "admin":
          navigate("/admin");
          break;
      }
    } else {
      toast({
        title: "Erro no login",
        description: "E-mail ou senha incorretos",
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