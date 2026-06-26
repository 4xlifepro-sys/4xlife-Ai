import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const messages = [
  "Connecting to live market feed...",
  "Syncing scanner state...",
  "Authenticating secure session...",
  "Loading dashboard...",
  "Aligning 4H bias..."
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const int = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 1500);
    return () => clearInterval(int);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0D12]"
    >
      <div className="flex flex-col items-center max-w-sm w-full px-6">
        {/* Animated Logo */}
        <motion.div 
          animate={{ scale: [0.98, 1.02, 0.98] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white tracking-tighter text-3xl mb-10 shadow-[0_0_40px_rgba(37,99,235,0.3)] relative overflow-hidden"
        >
          <div className="relative z-10">4<span className="text-blue-200">x</span></div>
          {/* Subtle shine effect over logo */}
          <motion.div 
             animate={{ x: ['-100%', '200%'] }}
             transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
             className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
          />
        </motion.div>

        {/* Loading Bar Container */}
        <div className="w-full h-1 bg-[#202735] rounded-full overflow-hidden mb-6 relative">
           <motion.div 
             initial={{ x: '-100%' }}
             animate={{ x: '0%' }}
             transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
             className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-full rounded-full"
           />
        </div>

        {/* Rotating Status Message */}
        <div className="h-6 overflow-hidden w-full flex justify-center">
          <AnimatePresence mode="wait">
             <motion.span
               key={messageIndex}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="text-xs font-mono font-medium text-[#8A95A5] uppercase tracking-widest text-center"
             >
               {messages[messageIndex]}
             </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
