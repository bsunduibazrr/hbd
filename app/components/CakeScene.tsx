"use client";
import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface CakeSceneProps {
  onComplete: () => void;
  onBlow: () => void;
}

export const CakeScene: React.FC<CakeSceneProps> = ({ onComplete, onBlow }) => {
  const [blown, setBlown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleBlow = () => {
    if (blown) return;
    setBlown(true);

    // Safety check for onBlow to trigger music instantly on user gesture
    if (onBlow) onBlow();

    try {
      if (typeof confetti === "function") {
        (confetti as Function)({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#ff0080", "#7928ca", "#ffffff", "#0070f3", "#f0f0f0"],
        });
      }
    } catch (e) {
      console.error("Confetti error:", e);
    }

    setTimeout(() => {
      onComplete();
    }, 4500);
  };

  const NumberCandle = ({ num, xOffset }: { num: string; xOffset: string }) => (
    <div
      className="absolute -top-16 md:-top-20 z-30 flex flex-col items-center"
      style={{ left: xOffset, transform: "translateX(-50%)" }}
    >
      {!blown && (
        <div className="relative mb-1">
          <div className="candle-flame"></div>
          <div className="absolute -inset-2 bg-yellow-400/30 blur-xl rounded-full animate-pulse"></div>
        </div>
      )}
      <div className="relative group">
        <span className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-pink-100 via-white to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] font-serif">
          {num}
        </span>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gray-400"></div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-10 md:space-y-16 transition-all duration-1000 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center space-y-3 md:space-y-6"
      >
        <h2 className="text-3xl md:text-7xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-white to-blue-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] animate-float px-2">
          Make a Wish <span className="text-white">✨</span>
        </h2>
        <p className="text-blue-200 font-light italic text-base md:text-2xl opacity-90 px-4">
          Give the flame a tap to make your wish
        </p>
      </motion.div>

      <div className="relative group perspective-distant scale-[0.6] sm:scale-90 md:scale-100">
        <AnimatePresence>
          {!blown &&
            [1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                  y: -180 - i * 20,
                  x: Math.sin(i) * 70,
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                className="absolute text-pink-400 text-2xl z-0"
              >
                🎈
              </motion.div>
            ))}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative cursor-pointer"
          onClick={handleBlow}
        >
          {/* Cake Structure */}
          <div className="relative mx-auto w-32 h-24 bg-gradient-to-b from-white to-pink-100 rounded-t-[50px] rounded-b-xl z-30 shadow-2xl border-b-2 border-pink-200">
            <NumberCandle num="1" xOffset="35%" />
            <NumberCandle num="9" xOffset="65%" />
          </div>

          <div className="relative mx-auto w-56 h-28 bg-gradient-to-b from-pink-100 to-pink-200 rounded-t-[40px] rounded-b-xl z-20 -mt-2 shadow-2xl border-b-2 border-pink-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <span className="text-2xl text-white tracking-[1em]">••••••</span>
            </div>
          </div>

          <div className="relative mx-auto w-72 md:w-80 h-36 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-[40px] rounded-b-3xl z-10 -mt-2 shadow-2xl border-b-4 border-pink-400">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-inner opacity-80"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-inner opacity-80"></div>
          </div>

          <div className="w-[300px] md:w-[450px] h-12 md:h-14 bg-gradient-to-b from-white via-blue-50 to-blue-100 shadow-[0_25px_50px_rgba(0,0,0,0.4)] rounded-[50%] mx-auto -mt-6 z-0 border-b-8 md:border-b-10 border-blue-200/40" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center space-y-6 pt-6">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 40px rgba(236,72,153,0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBlow}
          disabled={blown}
          className={`px-8 md:px-10 cursor-pointer py-3 md:py-4 rounded-full bg-black text-white text-lg md:text-2xl font-bold shadow-2xl transition-all duration-500 transform ${
            blown ? "opacity-0 scale-90 translate-y-10" : ""
          }`}
        >
          {blown ? "Wish sent! ✨" : "Blow the candles 🌬️"}
        </motion.button>

        {blown && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-pink-300 font-serif italic text-xl md:text-3xl animate-pulse mt-4 text-center tracking-wide px-4"
          >
            "May your all wishes come true..."
          </motion.p>
        )}
      </div>
    </div>
  );
};
