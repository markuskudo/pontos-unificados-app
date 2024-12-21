import { useEffect, useState } from "react";
import { db } from "@/db/mockDb";
import { Merchant, Offer } from "@/types";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Simulando busca do lojista logado
    const mockMerchant = db.findUserByEmail("joao@supermercado.com") as Merchant;
    setMerchant(mockMerchant);

    if (mockMerchant) {
      const merchantOffers = db.getMerchantOffers(mockMerchant.id);
      setOffers(merchantOffers);
    }
  }, []);

  if (!merchant) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Painel do Lojista</h1>

        <ResizablePanelGroup direction="horizontal" className="min-h-[500px]">
          <ResizablePanel defaultSize={30}>
            <div className="p-6 border rounded-lg h-full">
              <h2 className="text-xl font-semibold mb-4">Informações da Loja</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome da Loja</p>
                  <p className="font-medium">{merchant.storeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cidade</p>
                  <p className="font-medium">{merchant.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">
                    {merchant.active ? (
                      <span className="text-green-600">Ativo</span>
                    ) : (
                      <span className="text-red-600">Inativo</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={70}>
            <div className="p-6 border rounded-lg h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Minhas Ofertas</h2>
                <Button>Nova Oferta</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Pontos Necessários</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell>{offer.title}</TableCell>
                      <TableCell>{offer.description}</TableCell>
                      <TableCell>{offer.pointsRequired} pts</TableCell>
                      <TableCell>
                        {offer.validUntil.toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell>
                        {offer.active ? (
                          <span className="text-green-600">Ativa</span>
                        ) : (
                          <span className="text-red-600">Inativa</span>
                        )}
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

export default MerchantDashboard;