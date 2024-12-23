import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Merchant } from "@/types";
import { db } from "@/db/mockDb";
import { CompanyInfoForm } from "@/components/merchant/CompanyInfoForm";
import { AddressForm } from "@/components/merchant/AddressForm";
import { PasswordForm } from "@/components/merchant/PasswordForm";

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
    number: "",
    complement: "",
    neighborhood: "",
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
          <CompanyInfoForm formData={formData} setFormData={setFormData} />
          <AddressForm formData={formData} setFormData={setFormData} />
          <PasswordForm formData={formData} setFormData={setFormData} />

          <Button type="submit" className="w-full">
            Salvar Alterações
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StoreSettings;