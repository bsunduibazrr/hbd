import React, { useState } from "react";
import { motion } from "framer-motion";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const SECRET_CODE = "0110";

  const handleInput = (btn: string) => {
    if (code.length < 4) {
      const newCode = code + btn;
      setCode(newCode);
      if (newCode.length === 4) {
        if (newCode === SECRET_CODE) {
          onUnlock();
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setCode("");
          }, 1500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-105 bg-[#2d1b4d]/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 sm:p-12 flex flex-col items-center shadow-2xl relative overflow-hidden"
      >
        {/* Top Lock Icon */}
        <div className="w-24 h-24 bg-[#6c48d3]/50 rounded-full flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(108,72,211,0.3)]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        {/* Text Section */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-4xl font-serif text-white tracking-wide">
            Unlock the Magic
          </h1>
          <p className="text-white/60 text-lg font-light">
            Enter the special date (MM.DD)
          </p>
        </div>

        {/* Code Indicator Boxes */}
        <div className={`flex space-x-3 mb-12 ${error ? "animate-shake" : ""}`}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                code.length > i
                  ? "border-white/40 bg-white/10"
                  : "border-white/10 bg-white/5"
              } ${error ? "border-red-500/50 bg-red-500/10" : ""}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  code.length > i ? "bg-white scale-125" : "bg-white/20"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
            <motion.button
              key={num}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleInput(num)}
              className="h-16 rounded-2xl cursor-pointer bg-white/5 border border-white/5 text-white text-2xl font-light transition-all flex items-center justify-center hover:border-white/20"
            >
              {num}
            </motion.button>
          ))}

          {/* Bottom Row */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="h-16 rounded-2xl cursor-pointer bg-white/5 border border-white/5 text-white text-2xl font-light transition-all flex items-center justify-center hover:border-white/20"
          >
            <span className="text-2xl">⭐️</span>
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleInput("0")}
            className="h-16 rounded-2xl bg-white/5 border cursor-pointer border-white/5 text-white text-2xl font-light transition-all flex items-center justify-center hover:border-white/20"
          >
            0
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.92 }}
            onClick={handleBackspace}
            className="h-16 rounded-2xl cursor-pointer bg-white/5 border border-white/5 text-white text-2xl font-light transition-all flex items-center justify-center hover:border-white/20"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
              <line x1="18" y1="9" x2="12" y2="15"></line>
              <line x1="12" y1="9" x2="18" y2="15"></line>
            </svg>
          </motion.button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 text-red-400 font-medium tracking-widest text-xs uppercase"
          >
            Try Again
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};
