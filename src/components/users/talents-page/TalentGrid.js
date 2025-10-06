import { AnimatePresence, motion } from 'framer-motion';
import TalentCardComponent from '@/src/components/users/talent/TalentCardComponent';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export const TalentGrid = ({ talents }) => (
  <AnimatePresence>
    {talents.length > 0 ? (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5"
      >
        {talents.map((talent) => (
          <motion.div key={talent.id} variants={item} layout>
            <TalentCardComponent talent={talent} />
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow p-8 text-center"
      >
        <h3 className="text-xl font-medium text-gray-700 mb-2">No talents found</h3>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default TalentGrid;
