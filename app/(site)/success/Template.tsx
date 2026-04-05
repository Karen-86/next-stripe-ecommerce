"use client";

import React, { useEffect, useState } from "react";

import Stripe from "stripe";


const Template = () => {
  return (
    <main className="home-page">
      <HeroSection />
    </main>
  );
};

const HeroSection = () => {
  return (
    <section className="hero sm:min-h-[50vh] pt-[80px] pb-[80px] flex">
      <div className="container  flex-1 flex items-center justify-center">
        <h1 className="text-6xl">Success</h1>
      </div>
    </section>
  );
};




export default Template;
