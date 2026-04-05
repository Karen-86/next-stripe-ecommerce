"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonDemo } from "@/components/button/ButtonDemo";
import LOCAL_DATA from "@/conststants/localData";
import type { Product, StoredProduct } from "@/modules/products/types";
import { useProductStore } from "@/modules/products/products";

const { exampleImage } = LOCAL_DATA.images;
const { shopIcon } = LOCAL_DATA.svgs;

type ProductCardProp = {
  product: Product;
  setProduct?: (data: Product) => void;
  className?: string;
  successCB?: () => void;
};

export const ProductCard = ({ product, setProduct, className }: ProductCardProp) => {
  const [imageURL, setImageURL] = useState(product.images[0]);

  const setIsCartSheetOpen = useProductStore((s) => s.setIsCartSheetOpen);
  const getProductsAsync = useProductStore((s) => s.getProductsAsync);
  const getProductAsync = useProductStore((s) => s.getProductAsync);

  const handleCartProducts = () => {
    let cart: StoredProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const exists = cart.some((item) => item.productId === product.id);

    if (exists) {
      cart = cart.filter((item) => item.productId !== product.id);
    } else {
      cart.push({ productId: product.id, quantity: product.quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    getProductsAsync({ successCB: () => !exists && setIsCartSheetOpen(true) });
    setProduct && getProductAsync({ productId: product.id, successCB: (data: any) => data && setProduct?.(data) });
  };

  return (
    <div className={`${className} card product-card justify-between shadow border rounded-xl p-5 flex flex-col`}>
      <div className="card-header">
        <div className="card-image relative pt-[60%] h-0 w-full  mb-[1rem]">
          <img
            src={imageURL}
            onError={() => setImageURL(exampleImage)}
            alt=""
            className="rounded-xl block absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="card-body">
        <h4 className="card-title flex-1 !font-normal text-gray-500 mb-[1rem] text-sm">{product.name}</h4>
        <p className="card-description text-xs text-gray-500 mb-[1rem]">{product.description}</p>
        <div className="card-price mb-[1rem]">${(product.price / 100).toFixed(2)}</div>
        <div className="card-btns flex gap-3">
          <Link href={`shop/${product.id}`} className="block flex-1  card-link">
            <ButtonDemo text="View Details" variant="outline" className="w-full " />
          </Link>
          <ButtonDemo
            onClick={handleCartProducts}
            className=" rounded-full"
            variant={product.isInCart ? "default" : "secondary"}
            size="icon"
            icon={shopIcon}
          />
        </div>
      </div>
    </div>
  );
};
