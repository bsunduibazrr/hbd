import React from "react";
import { motion } from "framer-motion";

export const FinalMessage: React.FC = () => {
  return (
    <div className="text-center space-y-12 py-20 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-125 h-125 bg-pink-500/30 blur-[150px] rounded-full animate-pulse"></div>
        <div className="w-100 h-100 bg-blue-500/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative z-10 space-y-8"
      >
        <p className="text-3xl md:text-5xl font-serif text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] italic leading-relaxed">
          "This website was made <br />
          <span className="text-pink-400 not-italic font-bold">
            just for you.
          </span>
          "
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl font-light text-blue-200 tracking-wide"
        >
          Hope today makes you smile, today and always.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="pt-32 opacity-40 text-sm tracking-[0.5em] uppercase text-white font-light"
      >
        ЧИ ХАМГИЙН МУНДАГ НЬ
      </motion.div>

      <div className="flex justify-center space-x-4">
        {[1, 2, 3].map((i) => (
          <motion.span
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
              boxShadow: [
                "0 0 0px #ec4899",
                "0 0 20px #ec4899",
                "0 0 0px #ec4899",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            className={`w-3 h-3 rounded-full ${
              i === 1
                ? "bg-pink-400"
                : i === 2
                ? "bg-purple-400"
                : "bg-blue-400"
            }`}
          ></motion.span>
        ))}
      </div>
    </div>
  );
};
