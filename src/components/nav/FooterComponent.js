'use client';

import Link from 'next/link';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Press', href: '/press' },
      { name: 'Contact', href: '/contact' },
    ],
    services: [
      { name: 'Web Development', href: '/services/web' },
      { name: 'Mobile Development', href: '/services/mobile' },
      { name: 'UI/UX Design', href: '/services/design' },
      { name: 'Quality Assurance', href: '/services/qa' },
      { name: 'DevOps', href: '/services/devops' },
    ],
    resources: [
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Resources', href: '/resources' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com/company/pixcoders', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com/pixcoders', label: 'Twitter' },
    { icon: <FaFacebookF />, href: 'https://facebook.com/pixcoders', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com/pixcoders', label: 'Instagram' },
    { icon: <FaYoutube />, href: 'https://youtube.com/pixcoders', label: 'YouTube' },
    { icon: <FaGithub />, href: 'https://github.com/pixcoders', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 inline-block">
              PixCoders
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering businesses with cutting-edge digital solutions. We build scalable, 
              secure, and high-performance applications tailored to your needs.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="mt-6 md:mt-0">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} PixCoders. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm">
                Accessibility
              </Link>
              <Link href="/sustainability" className="text-gray-400 hover:text-white text-sm">
                Sustainability
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;