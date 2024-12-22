import { useEffect, useState } from "react";
import { db } from "@/db/mockDb";
import { Customer, Merchant } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [searchCity, setSearchCity] = useState("");
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    // Simulando busca do cliente logado
    const mockCustomer = db.findUserByEmail("pedro@email.com") as Customer;
    setCustomer(mockCustomer);
  }, []);

  const handleSearch = () => {
    if (searchCity.trim()) {
      const foundMerchants = db.findMerchantsByCity(searchCity);
      setMerchants(foundMerchants);
    }
  };

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">Painel do Cliente</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Pontos Acumulados</CardTitle>
              <CardDescription>Total de pontos disponíveis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{customer.totalPoints}</p>
              
              <div className="mt-4 space-y-2">
                <p className="font-medium text-sm text-muted-foreground">Pontos por Loja:</p>
                {customer.pointsPerStore.map((store) => (
                  <div key={store.storeId} className="flex justify-between items-center">
                    <span className="text-sm">{store.storeName}</span>
                    <span className="font-medium">{store.points} pts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Buscar Lojas</CardTitle>
              <CardDescription>Encontre lojas participantes na sua cidade</CardDescription>
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
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </Button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {merchants.map((merchant) => (
                  <Card key={merchant.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{merchant.storeName}</CardTitle>
                      <CardDescription>{merchant.city}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="secondary"
                        className="w-full"
                        disabled={customer.enrolledStores.includes(merchant.id)}
                      >
                        {customer.enrolledStores.includes(merchant.id)
                          ? "Já Cadastrado"
                          : "Cadastrar"}
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