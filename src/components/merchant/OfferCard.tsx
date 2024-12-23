import { Offer } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

interface OfferCardProps {
  offer: Offer;
  onEdit: (offer: Offer) => void;
  onToggleStatus: (offerId: string) => void;
}

export const OfferCard = ({ offer, onEdit, onToggleStatus }: OfferCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedOffer, setEditedOffer] = useState(offer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editedOffer);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedOffer({
          ...editedOffer,
          image: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{offer.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{offer.description}</p>
        <p className="mt-2 font-medium">Pontos: {offer.pointsRequired}</p>
        {offer.image && (
          <img
            src={offer.image}
            alt={offer.title}
            className="mt-2 w-full h-32 object-cover rounded"
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
        <Button
          variant={offer.active ? "destructive" : "default"}
          onClick={() => onToggleStatus(offer.id)}
        >
          {offer.active ? "Desativar" : "Ativar"}
        </Button>
      </CardFooter>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Oferta</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={editedOffer.title}
                onChange={(e) =>
                  setEditedOffer({ ...editedOffer, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={editedOffer.description}
                onChange={(e) =>
                  setEditedOffer({ ...editedOffer, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="points">Pontos Necessários</Label>
              <Input
                id="points"
                type="number"
                value={editedOffer.pointsRequired}
                onChange={(e) =>
                  setEditedOffer({
                    ...editedOffer,
                    pointsRequired: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="image">Imagem da Oferta</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Salvar Alterações
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};