import { useQuery } from "@tanstack/react-query";
import { Session } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CustomerPointsProps {
  session: Session;
}

interface CustomerPoints {
  merchant: {
    store_name: string;
  };
  points: number;
}

export const CustomerPoints = ({ session }: CustomerPointsProps) => {
  const { toast } = useToast();

  const { data: customerPoints, isLoading } = useQuery({
    queryKey: ["customerPoints", session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("customer_points")
        .select(`
          points,
          merchant:merchants (
            store_name
          )
        `)
        .eq("customer_id", session?.user?.id);

      if (error) {
        toast({
          title: "Erro ao carregar pontos",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as CustomerPoints[];
    },
    enabled: !!session?.user?.id,
  });

  const totalPoints = customerPoints?.reduce(
    (sum, point) => sum + point.points,
    0
  ) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontos Acumulados</CardTitle>
        <CardDescription>Total de pontos disponíveis</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{totalPoints}</p>
        
        <div className="mt-4 space-y-2">
          <p className="font-medium text-sm text-muted-foreground">
            Pontos por Loja:
          </p>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : (
            customerPoints?.map((point, index) => (
              <div
                key={index}
                className="flex justify-between items-center"
              >
                <span className="text-sm">{point.merchant.store_name}</span>
                <span className="font-medium">{point.points} pts</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};