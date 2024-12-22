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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Edit, XOctagon } from "lucide-react";

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulando busca do lojista logado
    const mockMerchant = db.findUserByEmail("joao@supermercado.com") as Merchant;
    setMerchant(mockMerchant);

    if (mockMerchant) {
      const merchantOffers = db.getMerchantOffers(mockMerchant.id);
      setOffers(merchantOffers);
    }
  }, []);

  const handleCreateOffer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newOffer: Offer = {
      id: `offer-${offers.length + 1}`,
      merchantId: merchant?.id || "",
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pointsRequired: Number(formData.get("points")),
      validUntil: new Date(formData.get("validUntil") as string),
      active: true,
    };

    setOffers([...offers, newOffer]);
    toast({
      title: "Oferta criada com sucesso!",
      description: "A nova oferta foi adicionada à sua lista.",
    });
  };

  const handleEditOffer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    if (!editingOffer) return;

    const updatedOffer: Offer = {
      ...editingOffer,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pointsRequired: Number(formData.get("points")),
      validUntil: new Date(formData.get("validUntil") as string),
    };

    setOffers(offers.map(offer => 
      offer.id === updatedOffer.id ? updatedOffer : offer
    ));
    setEditingOffer(null);
    toast({
      title: "Oferta atualizada com sucesso!",
      description: "As alterações foram salvas.",
    });
  };

  const toggleOfferStatus = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId ? { ...offer, active: !offer.active } : offer
    ));
    toast({
      title: "Status da oferta atualizado",
      description: "A oferta foi atualizada com sucesso.",
    });
  };

  if (!merchant) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">Painel do Lojista</h1>

        <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
          <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
            <div className="p-4 lg:p-6 h-full">
              <h2 className="text-lg lg:text-xl font-semibold mb-4">Informações da Loja</h2>
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
            <div className="p-4 lg:p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-xl font-semibold">Minhas Ofertas</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Nova Oferta</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Criar Nova Oferta</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateOffer} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título da Oferta</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Ex: Desconto em Compras"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Descreva os detalhes da oferta"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="points">Pontos Necessários</Label>
                        <Input
                          id="points"
                          name="points"
                          type="number"
                          min="0"
                          placeholder="Ex: 5000"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="validUntil">Válido até</Label>
                        <Input
                          id="validUntil"
                          name="validUntil"
                          type="date"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Criar Oferta
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead className="hidden md:table-cell">Descrição</TableHead>
                      <TableHead>Pontos</TableHead>
                      <TableHead className="hidden md:table-cell">Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {offers.map((offer) => (
                      <TableRow key={offer.id}>
                        <TableCell>{offer.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{offer.description}</TableCell>
                        <TableCell>{offer.pointsRequired} pts</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {offer.validUntil.toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          {offer.active ? (
                            <span className="text-green-600">Ativa</span>
                          ) : (
                            <span className="text-red-600">Inativa</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setEditingOffer(offer)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Editar Oferta</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleEditOffer} className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-title">Título da Oferta</Label>
                                    <Input
                                      id="edit-title"
                                      name="title"
                                      defaultValue={editingOffer?.title}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-description">Descrição</Label>
                                    <Textarea
                                      id="edit-description"
                                      name="description"
                                      defaultValue={editingOffer?.description}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-points">Pontos Necessários</Label>
                                    <Input
                                      id="edit-points"
                                      name="points"
                                      type="number"
                                      min="0"
                                      defaultValue={editingOffer?.pointsRequired}
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-validUntil">Válido até</Label>
                                    <Input
                                      id="edit-validUntil"
                                      name="validUntil"
                                      type="date"
                                      defaultValue={editingOffer?.validUntil.toISOString().split('T')[0]}
                                      required
                                    />
                                  </div>
                                  <Button type="submit" className="w-full">
                                    Salvar Alterações
                                  </Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleOfferStatus(offer.id)}
                            >
                              <XOctagon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MerchantDashboard;