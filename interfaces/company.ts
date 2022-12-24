import { User } from "./user";
import { Rate } from "./rate";

export interface Company {
  id: number;
  name: string;
  subType: string;
  type: string;
  location: string;
  image: string;
  averageRate: number;
  averagePrice: number;
  owner: User;
  rates: Rate[];
}

export enum Type {
  RESTAURANT = "Restaurante",
  PHARMACY = "Farmácia",
  MARKET = "Mercado",
  BEER = "Bebida",
  PETS = "Pets",
  SHOPPING = "Shopping",
}

export enum SubType {
  MEET = "Carnes",
  SWEET = "Doces",
  SAVORY = "Salgados",
  ORIENTAL = "Oriental",
  HEALTHY = "Saudável",
  SPORT = "Esporte",
  BOOK = "Livros",
  GIFT = "Presente",
  ELECTRONICS = "Eletrônicos",
  COSMETIC = "Cosméticos",
  FURNITURE = "Móveis",
}
