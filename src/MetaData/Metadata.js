export const metadata = {
  title: "PixCoders | Web Development & Digital Solutions",
  description: "PixCoders delivers cutting-edge web development and digital transformation services. We build fast, scalable, and secure web applications tailored to your business needs.",
  keywords: [
    "web development", 
    "software solutions", 
    "PixCoders", 
    "digital transformation",
    "custom web applications",
    "responsive web design",
    "e-commerce development",
    "frontend development",
    "React development",
    "Next.js development"
  ],
  authors: [
    { name: 'PixCoders Team', url: 'https://pixcoders.dev' }
  ],
  creator: 'PixCoders',
  publisher: 'PixCoders',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://pixcoders.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
    domains: [
      { domain: 'pixcoders.dev', defaultLocale: 'en-US' },
      { domain: 'pixcoders.codes', defaultLocale: 'en-US' },
    ],
  },
  openGraph: {
    title: 'PixCoders | Web Development & Digital Solutions',
    description: 'Transform your digital presence with our expert web development and digital solutions. Custom, scalable, and innovative web applications for your business.',
    url: 'https://pixcoders.dev',
    siteName: 'PixCoders',
    images: [
      {
        url: 'https://pixcoders.dev/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PixCoders - Web Development & Digital Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixCoders | Web Development & Digital Solutions',
    description: 'Transform your digital presence with our expert web development and digital solutions.',
    images: ['https://pixcoders.dev/images/twitter-card.jpg'],
    creator: '@pixcoders',
    site: '@pixcoders',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YANDEX_VERIFICATION_CODE',
    yahoo: 'YAHOO_VERIFICATION_CODE',
    other: {
      me: ['hello@pixcoders.dev', 'https://pixcoders.dev/contact'],
    },
  },
  themeColor: '#2563eb',
  manifest: 'https://pixcoders.dev/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2563eb',
      },
    ],
  },
};

export default metadata;
