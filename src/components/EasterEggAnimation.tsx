"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EasterEggAnimationProps {
  isTriggered: boolean;
  onComplete: () => void;
}

export function EasterEggAnimation({
  isTriggered,
  onComplete,
}: EasterEggAnimationProps) {
  useEffect(() => {
    if (!isTriggered) return;

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isTriggered, onComplete]);

  return (
    <AnimatePresence>
      {isTriggered && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onComplete}
          />

          {/* Welcome Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[1999] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-black text-white mb-2">
                  Welcome to Rasvaad
                </h2>
                <p className="text-white/90 font-semibold">
                  Culinary Excellence Awaits
                </p>
              </div>

              {/* Content */}
              <div className="p-8 text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-charcoal/80 text-lg leading-relaxed">
                    Thank you for discovering our Easter Egg! You&apos;ve unlocked
                    something special.
                  </p>
                  <div className="flex justify-center gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🍽️</div>
                      <p className="text-sm font-semibold text-charcoal">
                        Premium Catering
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">✨</div>
                      <p className="text-sm font-semibold text-charcoal">
                        Unforgettable Events
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">💝</div>
                      <p className="text-sm font-semibold text-charcoal">
                        Your Happiness
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-black py-4 rounded-xl hover:shadow-lg transition-shadow duration-300 text-lg"
                >
                  Explore Our Services
                </motion.button>

                {/* Close hint */}
                <p className="text-charcoal/60 text-sm font-medium">
                  This popup will close in 5 seconds
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
