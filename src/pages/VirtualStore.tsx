import { useEffect, useState } from "react";
import { db } from "@/db/mockDb";
import { Offer } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const VirtualStore = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Em um ambiente real, buscaríamos todas as ofertas ativas do backend
    const allOffers = Object.values(db.getMerchantOffers("merchant-1"))
      .filter(offer => offer.active);
    setOffers(allOffers);
  }, []);

  const handleRedeemOffer = (offerId: string) => {
    toast({
      title: "Oferta resgatada!",
      description: "Entre em contato com a loja para resgatar sua oferta.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">Loja Virtual</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden">
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle>{offer.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {offer.description}
                </p>
                <p className="font-semibold mb-4">
                  Pontos necessários: {offer.pointsRequired}
                </p>
                <Button
                  className="w-full"
                  onClick={() => handleRedeemOffer(offer.id)}
                >
                  Resgatar Oferta
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualStore;