"use client";

import React, { useEffect } from "react";
import { Header, Footer, ProductCard } from "@/components/index.js";
import type { Product } from "@/modules/products/types";
import { useProductStore } from "@/modules/products/products";

const Template = () => {
  return (
    <main className="home-page pt-[150px]  min-h-[100vh]">
      <ShowcaseSection />
    </main>
  );
};

const ShowcaseSection = () => {
  return (
    <section>
      <div className="container">
        <h2 className="text-3xl mb-[1rem]">All Products</h2>
        <ProductList />
      </div>
    </section>
  );
};

const ProductList = () => {
  const products = useProductStore((s) => s.products);
  const isProductsLoading = useProductStore((s) => s.isProductsLoading);

  return (
    <div
      className={`${isProductsLoading  ? "pointer-events-none opacity-60" : ""} transition card-group products-card-group grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5 gap-y-10`}
    >
      {!products.length
        ? "Empty"
        : products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
    </div>
  );
};

export default Template;
