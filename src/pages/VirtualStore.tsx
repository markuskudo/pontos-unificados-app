import { useEffect, useState } from "react";
import { db } from "@/db/mockDb";
import { Offer, Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VirtualStore = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Get all merchant IDs from mockUsers
    const merchantIds = Object.values(db.mockUsers)
      .filter(user => user.role === "merchant")
      .map(user => user.id);

    // Get offers from all merchants
    const allOffers = merchantIds.flatMap(id => db.getMerchantOffers(id));
    setOffers(allOffers);

    // Get all active products
    const allProducts = db.getActiveProducts();
    setProducts(allProducts);
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
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
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
                      className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
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
                      Pontos necessários: {offer.pointsRequired.toLocaleString()}
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