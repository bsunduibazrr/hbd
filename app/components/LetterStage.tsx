import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BirthdayMessage } from "../types";
import { Heart, Sparkles, MailOpen } from "lucide-react";

export const LetterStage: React.FC = () => {
  // ЭНД ЗАХИАГАА ӨӨРЧЛӨӨРЭЙ
  const [message] = useState<BirthdayMessage>({
    title: "Happy birthdayy crybabyy ✨",
    content:
      "Today is the most amazing day — the day you came into this world.\n\nYou are one of the brightest and most beautiful people I know, and everything around you shines because of you and your smile. \n\nMay this new year of your life be filled with success, achievements, and magic. May all your wishes come true.\n\nAlways stay confident and full of energy, just the way you are now! Sometimes when I see you on social media, it makes me a little sad… and I really don’t like seeing you down 😅.\n\n Celebrate your birthday in the most wonderful way!",
    closing: "Level 18 unlocked! Keep shining ⭐️🤍",
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-2xl px-4 py-4 sm:py-8 flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer flex flex-col items-center w-full"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative w-full max-w-[320px] h-48 sm:h-56 bg-linear-to-br from-pink-50 to-purple-50 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 border-b border-pink-200/50 transform -skew-y-3" />
              <div className="absolute top-0 right-0 w-full h-1/2 bg-white/20 border-b border-pink-200/50 transform skew-y-3" />

              <MailOpen className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-4 px-4 text-center text-pink-300  text-xl sm:text-sm">
                Tap to hear the secrets the stars have for you ✌🏻
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full shadow-lg border-2 border-red-700 flex items-center justify-center">
                <Heart className="text-white w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              </div>
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-6 sm:mt-8 text-white font-cursive text-xl sm:text-2xl text-center"
            >
              A special letter, written just for you...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="bg-[#fdfbf7] p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl relative overflow-y-auto max-h-[80vh] w-full text-slate-800"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="absolute top-4 right-4 text-pink-300 opacity-50">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <header className="mb-6 sm:mb-8 text-center">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                {message.title}
              </h1>
              <div className="w-16 sm:w-24 h-1 bg-pink-200 mx-auto rounded-full" />
            </header>

            <div className="prose prose-sm sm:prose-lg max-w-none text-slate-700 leading-relaxed font-serif text-base sm:text-lg md:text-xl italic">
              {message.content.split("\n").map((para, i) => (
                <p key={i} className="mb-4 sm:mb-6">
                  {para}
                </p>
              ))}
            </div>

            <footer className="mt-8 sm:mt-12 text-right">
              <p className="font-cursive text-2xl sm:text-3xl text-pink-600 mb-2">
                {message.closing}
              </p>
              <div className="flex justify-end items-center gap-2 text-slate-400">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 fill-current" />
                <span className="text-xs sm:text-sm font-serif">
                  Your Friend From Across The Globe
                </span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
