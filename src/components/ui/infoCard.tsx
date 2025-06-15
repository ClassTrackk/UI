import { motion, AnimatePresence } from 'framer-motion';

type InfoCardProps = {
  content: React.ReactNode;
  onClose: () => void;
};


export const InfoCard = ({ content, onClose }: InfoCardProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-900 text-green-700 dark:text-green-400 p-6 rounded-xl shadow-xl max-w-md w-full text-center relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl"
          >
            ✕
          </button>
          <p>{content}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
