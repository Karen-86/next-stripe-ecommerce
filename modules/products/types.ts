import Stripe from "stripe";

export type Product = {
  id: string;
  name: string;
  description?: string;
  images: string[];

  //
  price: number;
  quantity: number;
  isInCart: boolean;
}

export type ProductResponse = Stripe.Product;

export type StoredProduct = {
  productId: string;
  quantity?: number;
};
