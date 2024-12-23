import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Customer } from "@/types";
import { db } from "@/db/mockDb";
import { useToast } from "@/hooks/use-toast";
import { QrCodeIcon, SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CustomerSearch = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    // Using findUserByEmail as a temporary way to find users until we implement findUserById
    const customer = db.findUserByEmail(customerId);

    if (customer && customer.role === "customer") {
      setCustomerData(customer as Customer);
      toast({
        title: "Cliente encontrado!",
        description: `Nome: ${customer.name}`,
      });
    } else {
      toast({
        title: "Cliente não encontrado",
        description: "Verifique o ID e tente novamente",
        variant: "destructive",
      });
    }
  };

  const handleQRCodeScan = () => {
    // Simulando uma leitura de QR Code
    toast({
      title: "Leitor de QR Code",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  return (
    <div className="p-4 space-y-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Buscar Cliente</h3>
      <div className="flex gap-2">
        <Input
          placeholder="ID do Cliente"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <SearchIcon className="h-4 w-4 mr-2" />
          Buscar
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <QrCodeIcon className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ler QR Code</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center border-2 border-dashed">
                <p className="text-sm text-gray-500">Câmera não disponível</p>
              </div>
              <Button onClick={handleQRCodeScan}>Iniciar Leitura</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {customerData && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h4 className="font-medium mb-2">Dados do Cliente</h4>
          <p>Nome: {customerData.name}</p>
          <p>Pontos Totais: {customerData.totalPoints}</p>
          <div className="mt-2">
            <p className="font-medium mb-1">Pontos por Loja:</p>
            {customerData.pointsPerStore?.map((store) => (
              <div key={store.storeId} className="flex justify-between text-sm">
                <span>{store.storeName}</span>
                <span>{store.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};