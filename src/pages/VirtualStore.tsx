import { useEffect, useState } from "react";
import { Offer, Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const VirtualStore = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch of offers
    const fetchOffers = async () => {
      const { data: offersData, error: offersError } = await supabase
        .from("offers")
        .select("*")
        .eq("active", true);

      if (offersError) {
        console.error("Error fetching offers:", offersError);
        return;
      }

      setOffers(offersData || []);
    };

    // Initial fetch of products
    const fetchProducts = async () => {
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("active", true);

      if (productsError) {
        console.error("Error fetching products:", productsError);
        return;
      }

      setProducts(productsData || []);
    };

    fetchOffers();
    fetchProducts();

    // Set up real-time subscription for offers
    const channel = supabase
      .channel('offers-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'offers',
          filter: 'active=eq.true'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          
          if (payload.eventType === 'INSERT' && payload.new.active) {
            setOffers(current => [...current, payload.new as Offer]);
          } else if (payload.eventType === 'UPDATE') {
            if (payload.new.active) {
              setOffers(current =>
                current.map(offer =>
                  offer.id === payload.new.id ? payload.new as Offer : offer
                )
              );
            } else {
              setOffers(current =>
                current.filter(offer => offer.id !== payload.new.id)
              );
            }
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

  const handleRedeemOffer = (offerId: string) => {
    toast({
      title: "Oferta resgatada!",
      description: "Entre em contato com a loja para resgatar sua oferta.",
    });
  };

  const handleRedeemProduct = (productId: string) => {
    toast({
      title: "Produto selecionado!",
      description: "Prossiga com o resgate usando pontos e dinheiro.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">Loja Virtual</h1>
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="offers">Ofertas dos Lojistas</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pontos + Dinheiro:</span>
                        <span className="font-semibold">
                          {Math.floor(product.pointsPrice).toLocaleString()} pts + R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      onClick={() => handleRedeemProduct(product.id)}
                    >
                      Resgatar Produto
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden">
                  {offer.image_url && (
                    <img
                      src={offer.image_url}
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
                      Pontos + Dinheiro: {Math.floor(offer.pointsRequired).toLocaleString()} pts + R$ {offer.totalPrice.toFixed(2)}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VirtualStore;