"use client";

import React from 'react';
import { HeroSection } from '../../../src/components/users/why-pix-coders/HeroSectionComponent';
import { StatsSection } from '../../../src/components/users/why-pix-coders/StatsSectionComponent';
import { BenefitsSection } from '../../../src/components/users/why-pix-coders/BenefitsSectionComponent';
import { TestimonialsSection } from '../../../src/components/users/why-pix-coders/TestimonialsSectionComponent';
import { CallToActionSection } from '../../../src/components/users/why-pix-coders/CallToActionSectionComponent';

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