import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Merchant {
  id: string;
  store_name: string;
  city: string;
}

export const MerchantSearch = () => {
  const [searchCity, setSearchCity] = useState("");
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const { toast } = useToast();

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
      customer_id: (await supabase.auth.getUser()).data.user?.id,
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

  return (
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
  );
};