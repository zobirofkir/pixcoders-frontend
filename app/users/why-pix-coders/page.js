"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { value: '99%', label: 'Success Rate' },
  { value: '24/7', label: 'Support' },
  { value: '4.9/5', label: 'Client Rating' },
  { value: '100+', label: 'Projects Delivered' },
];

const benefits = [
  {
    title: 'Top 3% of Talent',
    description: 'We accept only the top 3% of developers who pass our rigorous screening process.',
    icon: '🎯',
  },
  {
    title: 'Fast Matching',
    description: 'Get matched with the perfect developer for your project in days, not weeks.',
    icon: '⚡',
  },
  {
    title: 'Risk-Free Trial',
    description: 'Start with a trial period to ensure the developer is the right fit.',
    icon: '🛡️',
  },
];

const testimonials = [
  {
    quote: "PixCoders transformed our development process. Their developers are exceptional.",
    author: "Sarah Johnson",
    role: "CTO at TechCorp"
  },
  {
    quote: "The quality of talent at PixCoders is unmatched. Will definitely work with them again.",
    author: "Michael Chen",
    role: "Product Manager at InnovateX"
  }
];

const WhyPixCoders = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Why Choose PixCoders?
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl mb-10 text-blue-100"
            >
              World-class software development talent, vetted and ready to join your team
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/contact" 
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Advantages</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-sm"
                >
                  <div className="text-yellow-400 text-3xl mb-4">"</div>
                  <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-blue-600 text-sm">{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to work with the best?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of companies that trust PixCoders for their software development needs.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/hire" 
              className="bg-white text-blue-900 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block mx-2"
            >
              Hire Developers
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-3 px-8 rounded-full text-lg transition duration-300 inline-block mx-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyPixCoders;