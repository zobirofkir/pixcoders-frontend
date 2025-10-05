'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaRocket } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const Countdown = dynamic(
  () => import('../components/Countdown'),
  { 
    ssr: false,
    loading: () => <div className="h-40"></div>
  }
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <main className="max-w-4xl w-full text-center">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PixCoders
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            We're Building Something Amazing
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            We're working hard to bring you an exceptional digital experience. 
            Our team is crafting smart solutions to help your business thrive in the digital world.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a 
              href="mailto:zobirofkir19@gmail.com" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <FaEnvelope className="text-xl" />
              Get in Touch
            </a>
            <a 
              href="#about" 
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <FaCode className="text-xl" />
              Learn More
            </a>
          </div>
          
          <Countdown />
        </div>

        <div id="about" className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <FaRocket className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Zobir Dev</h3>
            <p className="text-lg text-gray-600 mb-4">Software Developer 🚀</p>
            <p className="text-md text-gray-500">Building smart digital solutions 🌍</p>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">Get in Touch</h4>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:zobirofkir19@gmail.com" 
                className="text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/zobirofkir" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://linkedin.com/in/zobirofkir" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PixCoders. All rights reserved.</p>
          <p className="mt-2">Crafting digital excellence with passion and precision.</p>
        </div>
      </footer>
    </div>
  );
}
