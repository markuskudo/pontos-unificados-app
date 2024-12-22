import { User, Merchant, Customer, Product, Offer } from "@/types";

// Dados fictícios para teste
export const mockUsers: Record<string, User | Merchant | Customer> = {
  // Admin
  "admin-1": {
    id: "admin-1",
    name: "Administrador Master",
    email: "admin@sistema.com",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },

  // Lojistas
  "merchant-1": {
    id: "merchant-1",
    name: "João Silva",
    email: "joao@supermercado.com",
    role: "merchant",
    createdAt: new Date("2024-01-15"),
    storeName: "Supermercado Economia",
    city: "São Paulo",
    points: 0,
    active: true,
  },
  "merchant-2": {
    id: "merchant-2",
    name: "Maria Oliveira",
    email: "maria@farmacia.com",
    role: "merchant",
    createdAt: new Date("2024-01-20"),
    storeName: "Farmácia Saúde",
    city: "Rio de Janeiro",
    points: 0,
    active: true,
  },

  // Clientes
  "customer-1": {
    id: "customer-1",
    name: "Pedro Santos",
    email: "pedro@email.com",
    role: "customer",
    createdAt: new Date("2024-02-01"),
    totalPoints: 1500,
    enrolledStores: ["merchant-1", "merchant-2"],
    pointsPerStore: [
      {
        storeId: "merchant-1",
        storeName: "Supermercado Economia",
        points: 1000
      },
      {
        storeId: "merchant-2",
        storeName: "Farmácia Saúde",
        points: 500
      }
    ]
  },
  "customer-2": {
    id: "customer-2",
    name: "Ana Souza",
    email: "ana@email.com",
    role: "customer",
    createdAt: new Date("2024-02-05"),
    totalPoints: 800,
    enrolledStores: ["merchant-1"],
    pointsPerStore: [
      {
        storeId: "merchant-1",
        storeName: "Supermercado Economia",
        points: 800
      }
    ]
  },
};

// Produtos disponíveis na loja virtual
export const mockProducts: Record<string, Product> = {
  "product-1": {
    id: "product-1",
    name: "Smart TV 55\"",
    description: "Smart TV LED 55\" 4K com Wi-Fi integrado",
    price: 2999.99,
    pointsPrice: 150000,
    image: "/placeholder.svg",
    active: true,
  },
  "product-2": {
    id: "product-2",
    name: "Smartphone XYZ",
    description: "Smartphone com 128GB, 6GB RAM e câmera tripla",
    price: 1999.99,
    pointsPrice: 100000,
    image: "/placeholder.svg",
    active: true,
  },
  "product-3": {
    id: "product-3",
    name: "Fone de Ouvido Bluetooth",
    description: "Fone de ouvido sem fio com cancelamento de ruído",
    price: 299.99,
    pointsPrice: 15000,
    image: "/placeholder.svg",
    active: true,
  },
};

// Ofertas dos lojistas
export const mockOffers: Record<string, Offer> = {
  "offer-1": {
    id: "offer-1",
    merchantId: "merchant-1",
    title: "Desconto em Compras",
    description: "Ganhe 10% de desconto em compras acima de R$ 200",
    pointsRequired: 5000,
    validUntil: new Date("2024-12-31"),
    active: true,
  },
  "offer-2": {
    id: "offer-2",
    merchantId: "merchant-2",
    title: "Produto Grátis",
    description: "Ganhe um produto de até R$ 50 nas compras acima de R$ 300",
    pointsRequired: 8000,
    validUntil: new Date("2024-12-31"),
    active: true,
  },
};

// Funções auxiliares para simular operações do banco de dados
export const db = {
  // Função para buscar usuário por email
  findUserByEmail: (email: string) => {
    return Object.values(mockUsers).find((user) => user.email === email);
  },

  // Função para buscar lojistas por cidade
  findMerchantsByCity: (city: string) => {
    return Object.values(mockUsers).filter(
      (user) =>
        user.role === "merchant" &&
        (user as Merchant).city.toLowerCase().includes(city.toLowerCase())
    ) as Merchant[];
  },

  // Função para buscar produtos ativos
  getActiveProducts: () => {
    return Object.values(mockProducts).filter((product) => product.active);
  },

  // Função para buscar ofertas ativas de um lojista
  getMerchantOffers: (merchantId: string) => {
    return Object.values(mockOffers).filter(
      (offer) => offer.merchantId === merchantId && offer.active
    );
  },
};
