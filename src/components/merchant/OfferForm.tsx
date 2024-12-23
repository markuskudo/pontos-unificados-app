import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OfferFormProps {
  onSubmit: (formData: FormData) => void;
  editingOffer?: any;
}

export const OfferForm = ({ onSubmit, editingOffer }: OfferFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    onSubmit(formData);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {editingOffer ? "Editar Oferta" : "Criar Nova Oferta"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Oferta</Label>
          <Input
            id="title"
            name="title"
            defaultValue={editingOffer?.title}
            placeholder="Ex: Desconto em Compras"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={editingOffer?.description}
            placeholder="Descreva os detalhes da oferta"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="points">Pontos Necessários</Label>
          <Input
            id="points"
            name="points"
            type="number"
            min="0"
            defaultValue={editingOffer?.pointsRequired}
            placeholder="Ex: 5000"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="validUntil">Válido até</Label>
          <Input
            id="validUntil"
            name="validUntil"
            type="date"
            defaultValue={editingOffer?.validUntil?.toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Adicionar Imagem</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
          />
        </div>
        <Button type="submit" className="w-full">
          {editingOffer ? "Salvar Alterações" : "Criar Oferta"}
        </Button>
      </form>
    </DialogContent>
  );
};