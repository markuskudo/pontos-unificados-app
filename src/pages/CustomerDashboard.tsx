import { useEffect, useState } from "react";
import { db } from "@/db/mockDb";
import { Customer, Merchant } from "@/types";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CustomerDashboard = () => {
  const [citySearch, setCitySearch] = useState("");
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Simulando busca do cliente logado
    const mockCustomer = db.findUserByEmail("pedro@email.com") as Customer;
    setCustomer(mockCustomer);
  }, []);

  const handleSearch = () => {
    if (citySearch.trim()) {
      const foundMerchants = db.findMerchantsByCity(citySearch);
      setMerchants(foundMerchants);
    }
  };

  if (!customer) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Painel do Cliente</h1>

        <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
          <ResizablePanel defaultSize={30}>
            <div className="p-6 border rounded-lg h-full">
              <h2 className="text-xl font-semibold mb-4">Meu Perfil</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">{customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Pontos</p>
                  <p className="font-medium text-xl text-primary">
                    {customer.totalPoints} pts
                  </p>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={70}>
            <div className="p-6 border rounded-lg h-full">
              <h2 className="text-xl font-semibold mb-4">Buscar Lojas</h2>
              
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Digite o nome da cidade..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
                <Button onClick={handleSearch}>
                  <Search className="mr-2" />
                  Buscar
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loja</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {merchants.map((merchant) => (
                    <TableRow key={merchant.id}>
                      <TableCell>{merchant.storeName}</TableCell>
                      <TableCell>{merchant.city}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={customer.enrolledStores.includes(merchant.id)}
                        >
                          {customer.enrolledStores.includes(merchant.id)
                            ? "Inscrito"
                            : "Inscrever-se"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CustomerDashboard;