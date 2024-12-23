import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const AdminReports = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reportType, setReportType] = useState("users");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleExportPDF = () => {
    toast({
      title: "Exportando PDF",
      description: `Relatório de ${startDate} até ${endDate} será gerado em breve.`,
    });
  };

  const handleExportExcel = () => {
    toast({
      title: "Exportando Excel",
      description: `Relatório de ${startDate} até ${endDate} será gerado em breve.`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mr-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Relatórios</h1>
      </div>

      <div className="space-y-4 mb-6">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-full md:w-[280px]">
            <SelectValue placeholder="Selecione o tipo de relatório" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="users">Usuários</SelectItem>
            <SelectItem value="merchants">Lojistas</SelectItem>
            <SelectItem value="customers">Clientes</SelectItem>
            <SelectItem value="offers">Ofertas</SelectItem>
            <SelectItem value="points">Pontos por Cliente</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium mb-2">
              Data Inicial
            </label>
            <Input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
              Data Final
            </label>
            <Input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:bg-gray-50" onClick={handleExportPDF}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Exportar PDF
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gere um relatório detalhado em formato PDF
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50" onClick={handleExportExcel}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              Exportar Excel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gere um relatório detalhado em formato Excel
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;