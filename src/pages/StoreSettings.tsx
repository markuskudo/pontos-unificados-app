import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Merchant } from "@/types";
import { db } from "@/db/mockDb";

const StoreSettings = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: merchant?.storeName || "",
    cnpj: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    whatsapp: merchant?.whatsapp || "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    // Em um ambiente real, enviaríamos essas alterações para o backend
    toast({
      title: "Alterações salvas",
      description: "As informações da loja foram atualizadas com sucesso.",
    });
  };

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
            {/* Informações da Empresa */}
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold mb-4">Informações da Empresa</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nome da Empresa</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) =>
                      setFormData({ ...formData, cnpj: e.target.value })
                    }
                    className="mt-1"
                    placeholder="00.000.000/0000-00"
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold mb-4">Endereço</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">Endereço Completo</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) =>
                      setFormData({ ...formData, street: e.target.value })
                    }
                    className="mt-1"
                    placeholder="Rua, número, complemento"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    className="mt-1"
                    placeholder="00000-000"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    className="mt-1"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Alterar Senha */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, currentPassword: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
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