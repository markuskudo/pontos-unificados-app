import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CompanyInfoFormProps {
  formData: {
    companyName: string;
    cnpj: string;
  };
  setFormData: (data: any) => void;
}

export const CompanyInfoForm = ({ formData, setFormData }: CompanyInfoFormProps) => {
  return (
    <div className="border-b pb-6">
      <h2 className="text-lg font-semibold mb-4">Informações da Empresa</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="companyName">Nome da Empresa</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input
            id="cnpj"
            value={formData.cnpj}
            onChange={(e) =>
              setFormData({ ...formData, cnpj: e.target.value })
            }
            className="mt-1"
            placeholder="00.000.000/0000-00"
          />
        </div>
      </div>
    </div>
  );
};