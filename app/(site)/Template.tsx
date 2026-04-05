"use client";

import React, { useEffect, useState } from "react";
import { Header, Footer, ProductCard, ControlledSheetDemo } from "@/components/index.js";
import { useProductStore } from "@/modules/products/products";
import type { Product, ProductResponse } from "@/modules/products/types";
import Image from "next/image";
import LOCAL_DATA from "@/conststants/localData";

const { exampleImage } = LOCAL_DATA.images;

const Template = () => {
  return (
    <main className="home-page  min-h-[100vh]">
      <HeroSection />
      <ShowcaseSection />
    </main>
  );
};

const HeroSection = () => {
  const [state, setState] = useState({
    name: "",
    cover: exampleImage,
  });
  const [cover, setCover] = useState("");
  const products = useProductStore((s) => s.products);

  useEffect(() => {
    if (!products.length) return;
    setCover(products[0].images[0]);
    setState((prev) => ({
      name: products[0].name,
      cover: products[0].images[0],
    }));
  }, [products]);

  return (
    <section className="hero !pt-[100px] pb-[80px] flex ">
      <div className="container">
        <div className="banner rounded-xl shadow h-[200px] overflow-hidden border bg-black text-white flex  justify-between">
          <div className="hero-content  p-[30px]">
            <h1 className="text-3xl">{state.name}</h1>
          </div>
          <div className="w-[200px]">
            <div className="pt-[100%] w-full h-0 ml-auto relative">
              <Image
                src={state.cover}
                fill
                alt="image"
                priority
                sizes="100vw, (min-width: 768px) 50vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => {
  return (
    <section>
      <div className="container">
        <h2 className="text-3xl mb-[1rem]">Featured Products</h2>
        <ProductList />
      </div>
    </section>
  );
};

const ProductList = () => {
  const products = useProductStore((s) => s.products);
  const getProductsAsync = useProductStore((s) => s.getProductsAsync);
  const isProductsLoading = useProductStore((s) => s.isProductsLoading);

  return (
    <div
      className={`${isProductsLoading ? "pointer-events-none opacity-60" : ""} transition card-group products-card-group grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5 gap-y-10`}
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
