"use client";

import React from 'react';
import { HeroSection } from '../../../src/components/users/why-pix-coders/HeroSection';
import { StatsSection } from '../../../src/components/users/why-pix-coders/StatsSection';
import { BenefitsSection } from '../../../src/components/users/why-pix-coders/BenefitsSection';
import { TestimonialsSection } from '../../../src/components/users/why-pix-coders/TestimonialsSection';
import { CallToActionSection } from '../../../src/components/users/why-pix-coders/CallToActionSection';

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