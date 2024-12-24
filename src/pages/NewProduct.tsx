import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Here you would typically send the data to your backend
    console.log({
      category: formData.get("category"),
      name: formData.get("name"),
      description: formData.get("description"),
      points: formData.get("points"),
      price: formData.get("price"),
      image,
    });

    toast({
      title: "Produto cadastrado com sucesso!",
      description: "O produto foi adicionado à loja virtual.",
    });

    navigate("/admin");
  };

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/admin")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cadastrar Novo Produto</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Eletrônicos</SelectItem>
                <SelectItem value="home">Casa</SelectItem>
                <SelectItem value="fashion">Moda</SelectItem>
                <SelectItem value="sports">Esportes</SelectItem>
                <SelectItem value="others">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              name="name"
              placeholder="Digite o nome do produto"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Descreva o produto"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="points">Pontos Necessários</Label>
              <Input
                id="points"
                name="points"
                type="number"
                min="0"
                placeholder="Ex: 5000"
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Valor em R$</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex: 99.90"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image">Imagem do Produto</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-2 max-w-xs rounded-lg"
              />
            )}
          </div>

          <Button type="submit" className="w-full">
            Cadastrar Produto
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;