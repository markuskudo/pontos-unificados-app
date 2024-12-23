import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFormProps {
  formData: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  setFormData: (data: any) => void;
}

export const AddressForm = ({ formData, setFormData }: AddressFormProps) => {
  return (
    <div className="border-b pb-6">
      <h2 className="text-lg font-semibold mb-4">Endereço</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="street">Rua</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="number">Número</Label>
            <Input
              id="number"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              value={formData.complement}
              onChange={(e) =>
                setFormData({ ...formData, complement: e.target.value })
              }
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={(e) =>
              setFormData({ ...formData, neighborhood: e.target.value })
            }
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="zipCode">CEP</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
            className="mt-1"
            placeholder="00000-000"
          />
        </div>
      </div>
    </div>
  );
};