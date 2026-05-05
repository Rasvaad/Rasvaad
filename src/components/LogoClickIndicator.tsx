"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LogoClickIndicatorProps {
  clickCount: number;
  targetClicks: number;
}

export function LogoClickIndicator({
  clickCount,
  targetClicks,
}: LogoClickIndicatorProps) {
  if (clickCount === 0) return null;

  const progress = (clickCount / targetClicks) * 100;
  const isNearCompletion = clickCount >= targetClicks - 1;

  return (
    <AnimatePresence>
      <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[1500] pointer-events-none">
        {/* Click counter notification */}
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`px-4 py-2 rounded-full font-bold text-white shadow-lg text-center ${
            isNearCompletion ? "bg-accent" : "bg-primary"
          }`}
        >
          <div className="text-sm">
            🔐 Secret: {clickCount}/{targetClicks}
          </div>
          <motion.div
            className="h-1 rounded-full mt-2 bg-white/30"
            style={{ width: "100px" }}
          >
            <motion.div
              className={`h-full rounded-full ${isNearCompletion ? "bg-yellow-300" : "bg-white"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
