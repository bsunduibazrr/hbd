import React, { useState, useEffect } from "react";
// @ts-ignore
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

    onBlow();
    setBlown(true);

    try {
      if (typeof confetti === "function") {
        (confetti as any)({
          particleCount: 250,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#FF69B4", "#FFFFFF", "#FF1493", "#F0E68C"],
        });
      }
    } catch (e) {
      console.error("Confetti error:", e);
    }

    setTimeout(() => {
      onComplete();
    }, 5500);
  };

  const NumberCandle = ({ num, xOffset }: { num: string; xOffset: string }) => (
    <div
      className="absolute -top-24 md:-top-32 z-50 flex flex-col items-center"
      style={{ left: xOffset, transform: "translateX(-50%)" }}
    >
      {/* Intense Realistic Flame */}
      {!blown && (
        <div className="relative mb-3">
          {/* Flame Layers */}
          <div className="w-4 h-8 bg-gradient-to-t from-orange-600 via-yellow-400 to-white rounded-full blur-[1px] animate-pulse shadow-[0_0_20px_#ff9d00] relative">
            <div className="absolute inset-0 bg-white/40 blur-sm rounded-full scale-75"></div>
          </div>
          {/* Wide Glow Aura */}
          <div className="absolute -inset-8 bg-yellow-500/20 blur-[40px] rounded-full animate-flicker"></div>
          <div className="absolute -inset-4 bg-orange-500/10 blur-[20px] rounded-full"></div>
        </div>
      )}

      {/* Golden Number Body */}
      <div className="relative group">
        <span className="text-6xl md:text-8xl font-black font-serif bg-gradient-to-b from-[#FFF5C3] via-[#FFD700] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
          {num}
        </span>
        {/* Golden Wick */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gradient-to-b from-gray-800 to-gray-600 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-12 md:space-y-24 transition-all duration-1000 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="text-center space-y-6"
      >
        <h2 className="text-4xl md:text-4xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] animate-float tracking-tighter">
          Happy 19th Birthday
        </h2>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-300"></div>
          <p className="text-pink-100/90 font-light italic text-lg md:text-3xl tracking-[0.3em] uppercase">
            Make a wish please
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-300"></div>
        </div>
      </motion.div>

      {/* Luxury Grand Cake */}
      <div className="relative perspective-1000 scale-90 sm:scale-110 md:scale-125">
        <AnimatePresence>
          {!blown &&
            [1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.7, 0],
                  y: -300,
                  x: Math.sin(i) * 150,
                }}
                transition={{ duration: 6, repeat: Infinity, delay: i * 1.2 }}
                className="absolute text-yellow-200/50 text-3xl pointer-events-none z-0"
              >
                ✨
              </motion.div>
            ))}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative cursor-pointer group"
          onClick={handleBlow}
        >
          {/* Top Tier - Cream & Gold Drip */}
          <div className="relative mx-auto w-40 h-24 bg-gradient-to-b from-[#FFFDF5] to-[#FFF5E1] rounded-t-[40px] rounded-b-xl z-40 shadow-2xl border-b-2 border-orange-100/50">
            <NumberCandle num="1" xOffset="30%" />
            <NumberCandle num="9" xOffset="70%" />

            {/* Elegant Gold Drips */}
            <div className="absolute -bottom-4 left-0 right-0 flex justify-around pointer-events-none">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-4 ${
                    i % 2 === 0 ? "h-10" : "h-6"
                  } bg-[#FFD700] rounded-full -mt-2 shadow-lg opacity-80`}
                ></div>
              ))}
            </div>
          </div>

          {/* Middle Tier - Rose Pink & Pearls */}
          <div className="relative mx-auto w-64 h-28 bg-gradient-to-b from-[#FFB6C1] to-[#FF69B4] rounded-t-[40px] rounded-b-xl z-30 -mt-2 shadow-2xl border-b-4 border-pink-700/20">
            {/* Pearl Decorations */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 opacity-80">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                ></div>
              ))}
            </div>
          </div>

          {/* Bottom Tier - Deep Rose & Patterns */}
          <div className="relative mx-auto w-80 h-36 bg-gradient-to-b from-[#FF69B4] to-[#C71585] rounded-t-[50px] rounded-b-3xl z-20 -mt-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
              <span className="text-[100px] font-serif">❦</span>
            </div>
            <div className="absolute inset-x-0 bottom-6 flex justify-around px-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-[#FFD700]/40 rounded-full border border-white/20"
                ></div>
              ))}
            </div>
          </div>

          {/* Luxury Cake Stand */}
          <div className="relative mx-auto w-[380px] h-12 bg-gradient-to-b from-white to-gray-200 shadow-2xl rounded-[50%] -mt-6 z-10 flex items-center justify-center">
            <div className="w-[95%] h-[80%] border-2 border-[#FFD700]/30 rounded-[50%]"></div>
          </div>

          {/* Ground Glow */}
          <div className="w-[450px] h-20 bg-[#FFD700]/10 blur-[60px] rounded-[50%] mx-auto -mt-10 z-0 pointer-events-none" />
        </motion.div>
      </div>

      <div className="flex flex-col items-center space-y-10 pt-4">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 60px rgba(255,215,0,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBlow}
          disabled={blown}
          className={`w-80 h-20 rounded-full bg-black text-white text-xl md:text-xl font-black shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-1000 border-2 border-white/20 uppercase tracking-widest ${
            blown ? "opacity-0 scale-90 translate-y-10" : "opacity-100"
          }`}
        >
          {blown ? "Magic in the air..." : "Blow Your Candles 🌬️"}
        </motion.button>

        {blown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <p className="text-white font-serif italic text-3xl md:text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] tracking-wide">
              May your all wishes come true
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
