import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFormProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setFormData: (data: any) => void;
}

export const PasswordForm = ({ formData, setFormData }: PasswordFormProps) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="currentPassword">Senha Atual</Label>
          <Input
            id="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="newPassword">Nova Senha</Label>
          <Input
            id="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};