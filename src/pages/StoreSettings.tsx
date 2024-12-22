import { useState, useEffect } from "react";
import { Merchant } from "@/types";
import { db } from "@/db/mockDb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StoreSettings = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const mockMerchant = db.findUserByEmail("joao@supermercado.com") as Merchant;
    setMerchant(mockMerchant);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Alterações salvas",
      description: "As informações da loja foram atualizadas com sucesso.",
    });
  };

  if (!merchant) return null;

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/merchant")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Painel
        </Button>

        <h1 className="text-2xl font-bold mb-6">Configurações da Loja</h1>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input
                id="storeName"
                defaultValue={merchant.storeName}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                defaultValue={merchant.city}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                defaultValue={merchant.email}
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StoreSettings;