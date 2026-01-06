"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const correctCode = "0107";

  const handleInput = (char: string) => {
    if (code.length < 5) {
      const newCode = code + char;
      setCode(newCode);
      if (newCode.length === 4) {
        if (newCode === correctCode) {
          setTimeout(onUnlock, 500);
        } else {
          setIsError(true);
          setTimeout(() => {
            setCode("");
            setIsError(false);
          }, 800);
        }
      }
    }
  };

  const handleBackspace = () => {
    setCode((prev) => prev.slice(0, -1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="relative z-10 w-[92%] max-w-md p-6 sm:p-8 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl text-center"
    >
      <div className="mb-6 sm:mb-8">
        <motion.div
          animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
          className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${
            isError
              ? "bg-red-500/30"
              : code === correctCode
              ? "bg-green-500/30"
              : "bg-purple-500/30"
          }`}
        >
          {code === correctCode ? (
            <Unlock className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          ) : (
            <Lock className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          )}
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2">
          Unlock the Magic
        </h2>
        <p className="text-slate-300 text-sm sm:text-base">
          Enter the special date (MM.DD)
        </p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-10 h-14 sm:w-12 sm:h-16 border-2 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-300 ${
              code[i]
                ? "border-white bg-white/20 text-white"
                : "border-white/20 bg-transparent text-white/40"
            } ${isError ? "border-red-500 text-red-500" : ""}`}
          >
            {code[i] || "•"}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "🤍", "0", "⌫"].map(
          (btn) => (
            <motion.button
              key={btn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                btn === "⌫" ? handleBackspace() : handleInput(btn)
              }
              className="h-14 sm:h-16 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-lg sm:text-xl font-medium transition-colors flex items-center justify-center"
            >
              {btn}
            </motion.button>
          )
        )}
      </div>
    </motion.div>
  );
};
