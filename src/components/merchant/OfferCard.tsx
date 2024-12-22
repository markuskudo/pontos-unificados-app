import { Offer } from "@/types";
import { Edit, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface OfferCardProps {
  offer: Offer;
  onEdit: (offer: Offer) => void;
  onToggleStatus: (offerId: string) => void;
}

export const OfferCard = ({ offer, onEdit, onToggleStatus }: OfferCardProps) => {
  return (
    <Card key={offer.id} className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{offer.title}</CardTitle>
        {offer.image && (
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-40 object-cover rounded-md"
          />
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{offer.pointsRequired} pts</span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(offer)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleStatus(offer.id)}
            >
              <XOctagon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};