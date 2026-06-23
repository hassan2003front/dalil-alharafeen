import React from 'react';
import { motion } from 'framer-motion';

const Splash = () => {
  return (
    <div className="fixed inset-0 bg-[var(--bg-color)] flex flex-col items-center justify-center z-[9999] overflow-hidden">
      {/* Dynamic Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center flex flex-col items-center gap-12 relative z-10"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 bg-gradient-to-tr from-primary/30 to-indigo-500/30 blur-3xl rounded-full"
          />
          <div className="w-44 h-44 bg-[var(--surface-color)] rounded-[56px] flex items-center justify-center shadow-[0_30px_100px_rgba(99,102,241,0.3)] border-4 border-white/50 dark:border-white/5 relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              src="/favicon.png"
              alt="Logo"
              className="w-[65%] h-[65%] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-20 flex flex-col items-center gap-4">
        <div className="w-48 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Splash;

