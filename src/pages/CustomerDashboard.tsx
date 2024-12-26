import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

interface CustomerPoints {
  merchant: {
    store_name: string;
  };
  points: number;
}

interface Merchant {
  id: string;
  store_name: string;
  city: string;
}

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  const [searchCity, setSearchCity] = useState("");
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  const { data: customerPoints, isLoading: isLoadingPoints } = useQuery({
    queryKey: ["customerPoints", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customer_points")
        .select(`
          points,
          merchant:merchants (
            store_name
          )
        `)
        .eq("customer_id", session?.user?.id);

      if (error) {
        toast({
          title: "Erro ao carregar pontos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as CustomerPoints[];
    },
    enabled: !!session?.user?.id,
  });

  const totalPoints = customerPoints?.reduce(
    (sum, point) => sum + point.points,
    0
  ) || 0;

  const handleSearch = async () => {
    if (searchCity.trim()) {
      const { data, error } = await supabase
        .from("merchants")
        .select("id, store_name, city")
        .ilike("city", `%${searchCity}%`)
        .eq("active", true);

      if (error) {
        toast({
          title: "Erro na busca",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setMerchants(data);
    }
  };

  const handleEnrollStore = async (merchantId: string) => {
    const { error } = await supabase.from("customer_points").insert({
      customer_id: session?.user?.id,
      merchant_id: merchantId,
      points: 0,
    });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Aviso",
          description: "Você já está cadastrado nesta loja",
        });
      } else {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      }
      return;
    }

    toast({
      title: "Sucesso",
      description: "Cadastro realizado com sucesso!",
    });
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-bold">Painel do Cliente</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/customer/settings")}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pontos Acumulados</CardTitle>
              <CardDescription>Total de pontos disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalPoints}</p>
              
              <div className="mt-4 space-y-2">
                <p className="font-medium text-sm text-muted-foreground">
                  Pontos por Loja:
                </p>
                {isLoadingPoints ? (
                  <p className="text-sm text-muted-foreground">Carregando...</p>
                ) : (
                  customerPoints?.map((point, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{point.merchant.store_name}</span>
                      <span className="font-medium">{point.points} pts</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Buscar Lojas</CardTitle>
              <CardDescription>
                Encontre lojas participantes na sua cidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Digite o nome da cidade..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="w-full sm:w-auto">
                  Buscar
                </Button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {merchants.map((merchant) => (
                  <Card key={merchant.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{merchant.store_name}</CardTitle>
                      <CardDescription>{merchant.city}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="secondary"
                        className="w-full"
                        onClick={() => handleEnrollStore(merchant.id)}
                      >
                        Cadastrar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;