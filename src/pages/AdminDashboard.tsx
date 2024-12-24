import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Coins, Award, LogOut } from "lucide-react";
import { db } from "@/db/mockDb";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Calculate statistics
  const merchants = Object.values(db.mockUsers).filter(user => user.role === "merchant");
  const customers = Object.values(db.mockUsers).filter(user => user.role === "customer");
  
  const totalPoints = customers.reduce((acc, customer) => acc + customer.totalPoints, 0);
  const usedPoints = 150000; // This would come from a real database
  const monthlyRevenue = merchants.length * 99.90; // Assuming R$99.90 monthly fee per merchant

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Painel do Administrador
        </h1>
        <Button variant="ghost" onClick={() => navigate("/")}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Lojistas
            </CardTitle>
            <Store className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {merchants.length}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              lojistas ativos
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {customers.length}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              clientes cadastrados
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Mensalidades
            </CardTitle>
            <Coins className="h-4 w-4 text-[#8B5CF6]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              R$ {monthlyRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              receita mensal
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pontos
            </CardTitle>
            <Award className="h-4 w-4 text-[#0EA5E9]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalPoints.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {usedPoints.toLocaleString()} pontos utilizados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
          onClick={() => navigate("/admin/users")}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="mr-2 h-5 w-5" />
              Gerenciar Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualize e edite informações de lojistas e clientes
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
          onClick={() => navigate("/admin/reports")}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Store className="mr-2 h-5 w-5" />
              Relatórios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gere relatórios completos em PDF e Excel
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;