"use client";

import React, { Suspense } from 'react';
import { HeroSectionComponent } from '../../../src/components/users/why-pix-coders/HeroSectionComponent';
import { StatsSectionComponent } from '../../../src/components/users/why-pix-coders/StatsSectionComponent';
import { BenefitsSectionComponent } from '../../../src/components/users/why-pix-coders/BenefitsSectionComponent';
import { TestimonialsSectionComponent } from '../../../src/components/users/why-pix-coders/TestimonialsSectionComponent';
import { CallToActionSectionComponent } from '../../../src/components/users/why-pix-coders/CallToActionSectionComponent';
import LoadingComponent from '@/src/components/loading/LoadingComponent';

const WhyPixCoders = () => {
  return (
    <Suspense fallback={LoadingComponent}>

      <div className="min-h-screen bg-white">
        <HeroSectionComponent />
        <StatsSectionComponent />
        <BenefitsSectionComponent />
        <TestimonialsSectionComponent />
        <CallToActionSectionComponent />
      </div>

    </Suspense>
  );
};

export default WhyPixCoders;