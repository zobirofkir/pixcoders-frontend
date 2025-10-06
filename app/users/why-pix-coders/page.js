"use client";

import React from 'react';
import { HeroSectionComponent } from '../../../src/components/users/why-pix-coders/HeroSectionComponent';
import { StatsSectionComponent } from '../../../src/components/users/why-pix-coders/StatsSectionComponent';
import { BenefitsSectionComponent } from '../../../src/components/users/why-pix-coders/BenefitsSectionComponent';
import { TestimonialsSectionComponent } from '../../../src/components/users/why-pix-coders/TestimonialsSectionComponent';
import { CallToActionSectionComponent } from '../../../src/components/users/why-pix-coders/CallToActionSectionComponent';

const WhyPixCoders = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSectionComponent />
      <StatsSectionComponent />
      <BenefitsSectionComponent />
      <TestimonialsSectionComponent />
      <CallToActionSectionComponent />
    </div>
  );
};

export default WhyPixCoders;