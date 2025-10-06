import React from 'react';

const BackgroundElements = () => (
  <>
    <div className="absolute inset-0 bg-grid-white/50 dark:bg-grid-gray-800/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-radial from-blue-500/5 via-transparent to-transparent" />
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 dark:opacity-30 animate-blob animation-delay-4000" />
  </>
);

export default BackgroundElements;
