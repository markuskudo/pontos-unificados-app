import { useState } from "react";
import { Merchant } from "@/types";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StoreInfoProps {
  merchant: Merchant;
}

export const StoreInfo = ({ merchant }: StoreInfoProps) => {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="p-4 lg:p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg lg:text-xl font-semibold">Informações da Loja</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowInfo(!showInfo)}
          className="ml-2"
        >
          {showInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      
      {showInfo && (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Nome da Loja</p>
            <p className="font-medium">{merchant.storeName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Cidade</p>
            <p className="font-medium">{merchant.city}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium">
              {merchant.active ? (
                <span className="text-green-600">Ativo</span>
              ) : (
                <span className="text-red-600">Inativo</span>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};