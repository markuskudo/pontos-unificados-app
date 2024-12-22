import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/db/mockDb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Customer } from "@/types";

const CustomerSettings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const customer = db.findUserByEmail("pedro@email.com") as Customer;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    whatsapp: "",
    birthDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Sucesso",
      description: "Informações atualizadas com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Configurações da Conta</h1>
          <Button variant="outline" onClick={() => navigate("/customer")}>
            Voltar ao Painel
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Seu QR Code</CardTitle>
              <CardDescription>
                Use este QR Code para identificação nas lojas parceiras
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="bg-white p-4 rounded-lg">
                <QRCodeSVG value={customer.id} size={200} />
                <p className="text-center mt-2 font-mono text-sm">ID: {customer.id}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize suas informações de cadastro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nova Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthDate: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="w-full">
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerSettings;