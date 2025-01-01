import { useEffect, useState } from "react";
import { Merchant, Offer } from "@/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { OfferCard } from "@/components/merchant/OfferCard";
import { CustomerSearch } from "@/components/merchant/CustomerSearch";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OfferForm } from "@/components/merchant/OfferForm";
import { supabase } from "@/integrations/supabase/client";

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial fetch of offers
    const fetchOffers = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error("Error fetching session:", sessionError);
        return;
      }

      if (!sessionData.session?.user.id) return;

      const { data: merchantData, error: merchantError } = await supabase
        .from("merchants")
        .select("*")
        .eq("id", sessionData.session.user.id)
        .single();

      if (merchantError) {
        console.error("Error fetching merchant:", merchantError);
        return;
      }

      setMerchant(merchantData);

      const { data: offersData, error: offersError } = await supabase
        .from("offers")
        .select("*")
        .eq("merchant_id", sessionData.session.user.id);

      if (offersError) {
        console.error("Error fetching offers:", offersError);
        return;
      }

      setOffers(offersData || []);
    };

    fetchOffers();

    // Set up real-time subscription
    const channel = supabase
      .channel('offers-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'offers'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT') {
            setOffers(current => [...current, payload.new as Offer]);
          } else if (payload.eventType === 'UPDATE') {
            setOffers(current =>
              current.map(offer =>
                offer.id === payload.new.id ? payload.new as Offer : offer
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setOffers(current =>
              current.filter(offer => offer.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCreateOffer = (formData: FormData) => {
    const newOffer: Offer = {
      id: `offer-${offers.length + 1}`,
      merchantId: merchant?.id || "",
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pointsRequired: Number(formData.get("points")),
      totalPrice: Number(formData.get("totalPrice") || 0),
      pointsPercentage: Number(formData.get("pointsPercentage") || 0),
      validUntil: new Date(formData.get("validUntil") as string),
      active: true,
    };

    setOffers([...offers, newOffer]);
    toast({
      title: "Oferta criada com sucesso!",
      description: "A nova oferta foi adicionada à sua lista.",
    });
  };

  const handleEditOffer = (formData: FormData) => {
    if (!editingOffer) return;

    const updatedOffer: Offer = {
      ...editingOffer,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      pointsRequired: Number(formData.get("points")),
      validUntil: new Date(formData.get("validUntil") as string),
    };

    // Handle image update similarly to creation
    const imageFile = formData.get("image") as File;
    if (imageFile) {
      console.log("Image file to upload:", imageFile);
    }

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
                  onEdit={setEditingOffer}
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