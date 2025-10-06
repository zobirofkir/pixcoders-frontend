export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export const buttonHover = {
  scale: 1.02,
  boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.3)',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

export const buttonTap = {
  scale: 0.98,
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 20,
  },
};
