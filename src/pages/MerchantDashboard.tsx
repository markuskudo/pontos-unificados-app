import { useEffect, useState } from "react";
import { db } from "@/db/mockDb";
import { Merchant, Offer } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { OfferCard } from "@/components/merchant/OfferCard";
import { CustomerSearch } from "@/components/merchant/CustomerSearch";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OfferForm } from "@/components/merchant/OfferForm";

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const mockMerchant = db.findUserByEmail("joao@supermercado.com") as Merchant;
    setMerchant(mockMerchant);

    if (mockMerchant) {
      const merchantOffers = db.getMerchantOffers(mockMerchant.id);
      setOffers(merchantOffers);
    }
  }, []);

  const handleCreateOffer = (formData: FormData) => {
    const newOffer: Offer = {
      id: `offer-${offers.length + 1}`,
      merchantId: merchant?.id || "",
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pointsRequired: calculatePointsRequired(
        Number(formData.get("totalPrice")),
        Number(formData.get("pointsPercentage"))
      ),
      totalPrice: Number(formData.get("totalPrice")),
      pointsPercentage: Number(formData.get("pointsPercentage")),
      validUntil: new Date(formData.get("validUntil") as string),
      active: true,
    };

    // Handle image if present
    const imageFile = formData.get("image") as File;
    if (imageFile) {
      // Here you would typically upload the image to a storage service
      console.log("Image file to upload:", imageFile);
    }

    setOffers([...offers, newOffer]);
    toast({
      title: "Oferta criada com sucesso!",
      description: "A nova oferta foi adicionada à sua lista.",
    });
  };

  const handleEditOffer = (formData: FormData) => {
    const updatedOffer: Offer = {
      ...editingOffer!,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pointsRequired: calculatePointsRequired(
        Number(formData.get("totalPrice")),
        Number(formData.get("pointsPercentage"))
      ),
      totalPrice: Number(formData.get("totalPrice")),
      pointsPercentage: Number(formData.get("pointsPercentage")),
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

  const calculatePointsRequired = (totalPrice: number, pointsPercentage: number) => {
    return Math.floor((totalPrice * pointsPercentage) / 100 * 100); // Multiply by 100 to convert to points
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
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">Painel do Lojista</h1>
          <Button variant="outline" onClick={() => navigate("/merchant/settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <CustomerSearch />

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg lg:text-xl font-semibold">Minhas Ofertas</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Nova Oferta</Button>
                </DialogTrigger>
                <OfferForm onSubmit={handleCreateOffer} />
              </Dialog>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onEdit={handleEditOffer}
                  onToggleStatus={toggleOfferStatus}
                />
              ))}
            </div>
          </div>
        </div>

        <Dialog open={!!editingOffer} onOpenChange={() => setEditingOffer(null)}>
          <OfferForm
            onSubmit={handleEditOffer}
            editingOffer={editingOffer}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default MerchantDashboard;