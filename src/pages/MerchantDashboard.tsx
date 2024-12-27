import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LogOut, Settings, ShoppingBag, Users, DollarSign, ChartBar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CustomerSearch } from "@/components/merchant/CustomerSearch";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { OfferCard } from "@/components/merchant/OfferCard";
import { OfferForm } from "@/components/merchant/OfferForm";
import { StoreInfo } from "@/components/merchant/StoreInfo";

const MerchantDashboard = () => {
  const [merchant, setMerchant] = useState(null);
  const [offers, setOffers] = useState([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalSales: 0,
    totalPoints: 0,
    averagePoints: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const supabase = useSupabaseClient();

  useEffect(() => {
    fetchMerchantData();
    fetchOffers();
    fetchStats();
  }, []);

  const fetchMerchantData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: merchantData, error } = await supabase
        .from('merchants')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setMerchant(merchantData);
    } catch (error) {
      console.error('Error fetching merchant:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados da loja",
        variant: "destructive",
      });
    }
  };

  const fetchOffers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('merchant_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as ofertas",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch total unique customers
      const { count: customersCount } = await supabase
        .from('customer_points')
        .select('customer_id', { count: 'exact', head: true })
        .eq('merchant_id', user.id);

      // Fetch total points
      const { data: pointsData } = await supabase
        .from('customer_points')
        .select('points')
        .eq('merchant_id', user.id);

      const totalPoints = pointsData?.reduce((sum, record) => sum + record.points, 0) || 0;
      const averagePoints = customersCount ? Math.round(totalPoints / customersCount) : 0;

      setStats({
        totalCustomers: customersCount || 0,
        totalSales: 0, // This would need to be implemented with a sales table
        totalPoints,
        averagePoints,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateOffer = async (formData: FormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newOffer = {
        merchant_id: user.id,
        title: formData.get("title"),
        description: formData.get("description"),
        points_required: calculatePointsRequired(
          Number(formData.get("totalPrice")),
          Number(formData.get("pointsPercentage"))
        ),
        total_price: Number(formData.get("totalPrice")),
        points_percentage: Number(formData.get("pointsPercentage")),
        valid_until: new Date(formData.get("validUntil") as string).toISOString(),
        active: true,
      };

      const { error } = await supabase
        .from('offers')
        .insert([newOffer]);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Oferta criada com sucesso",
      });

      fetchOffers();
    } catch (error) {
      console.error('Error creating offer:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a oferta",
        variant: "destructive",
      });
    }
  };

  const calculatePointsRequired = (totalPrice: number, pointsPercentage: number) => {
    return Math.floor((totalPrice * pointsPercentage) / 100 * 100);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout",
        variant: "destructive",
      });
    }
  };

  if (!merchant) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 lg:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold">Painel do Lojista</h1>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate("/merchant/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Totais</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalSales.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pontos Totais</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPoints}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
              <ChartBar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averagePoints}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <StoreInfo merchant={merchant} />
            </Card>
            <Card>
              <CustomerSearch />
            </Card>
          </div>

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

            <div className="grid gap-4">
              {offers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onEdit={() => {}}
                  onToggleStatus={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;