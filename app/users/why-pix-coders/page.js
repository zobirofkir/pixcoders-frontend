"use client";

import React from 'react';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CallToActionSection } from './components/CallToActionSection';

const WhyPixCoders = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default WhyPixCoders;