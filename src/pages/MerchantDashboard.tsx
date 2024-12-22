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
import { StoreInfo } from "@/components/merchant/StoreInfo";
import { OfferCard } from "@/components/merchant/OfferCard";

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
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
      image: formData.get("image") as string,
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
      image: formData.get("image") as string,
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
            <StoreInfo merchant={merchant} />
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
                      <div className="space-y-2">
                        <Label htmlFor="image">URL da Imagem</Label>
                        <Input
                          id="image"
                          name="image"
                          type="url"
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Criar Oferta
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onEdit={setEditingOffer}
                    onToggleStatus={toggleOfferStatus}
                  />
                ))}
              </div>

              <Dialog open={!!editingOffer} onOpenChange={() => setEditingOffer(null)}>
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
                    <div className="space-y-2">
                      <Label htmlFor="edit-image">URL da Imagem</Label>
                      <Input
                        id="edit-image"
                        name="image"
                        type="url"
                        defaultValue={editingOffer?.image}
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Salvar Alterações
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MerchantDashboard;