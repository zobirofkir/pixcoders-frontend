import Link from 'next/link';
import { motion } from 'framer-motion';

const WorkCardComponent = ({ work, index = 0 }) => {
  /**
   * Animation variants
   */
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }),
    hover: {
      y: -5,
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const imageHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: 0.2,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
    >
      <motion.div 
        className="relative h-64 overflow-hidden"
        variants={imageHoverVariants}
      >
        <img
          src={work.image}
          alt={work.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6"
          variants={overlayVariants}
          initial="initial"
        >
          <motion.div 
            className="text-white w-full"
            variants={contentVariants}
            initial="initial"
          >
            <h3 className="text-xl font-bold mb-2">{work.title}</h3>
            <p className="text-gray-200 text-sm mb-4">{work.description}</p>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag, index) => (
                <motion.span 
                  key={index} 
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{work.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{work.description}</p>
        <Link 
          href={work.link}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
        >
          <motion.span 
            className="inline-flex items-center"
            whileHover={{ color: '#1e40af' }}
            whileTap={{ scale: 0.98 }}
          >
            View Project
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: 'easeInOut'
              }}
            >
              →
            </motion.span>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
};

export default WorkCardComponent;
