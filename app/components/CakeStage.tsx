import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

interface CakeStageProps {
  onBlown: () => void;
}

const Sparkle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 0.8, 0],
      y: [0, -100],
      x: [0, (Math.random() - 0.5) * 200],
    }}
    transition={{
      duration: 2 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
    className="absolute pointer-events-none text-yellow-300"
  >
    <Star size={Math.random() * 12 + 8} fill="currentColor" />
  </motion.div>
);

export const CakeStage: React.FC<CakeStageProps> = ({ onBlown }) => {
  const [isBlown, setIsBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        setMicActive(true);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const checkVolume = () => {
          if (isBlown) return;
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

          if (average > 75) {
            handleBlow();
          } else {
            requestAnimationFrame(checkVolume);
          }
        };
        checkVolume();
      } catch (err) {
        console.warn("Microphone access denied or not available", err);
      }
    };

    initMic();

    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      audioContextRef.current?.close();
    };
  }, [isBlown]);

  const handleBlow = () => {
    if (isBlown) return;
    setIsBlown(true);
    setTimeout(onBlown, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative z-10 flex flex-col items-center px-4 w-full max-w-lg"
    >
      <div className="text-center mb-10 sm:mb-16">
        <motion.h2
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl sm:text-5xl font-serif text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        >
          Make a Wish
        </motion.h2>
        <p className="text-pink-200 text-lg sm:text-xl font-light tracking-wide max-w-xs mx-auto opacity-80">
          {micActive
            ? "“Give the microphone a little blow, or simply tap the flame 🌬️"
            : "Tap the flame to make your wish"}
        </p>
      </div>

      <div className="relative cursor-pointer group" onClick={handleBlow}>
        {/* Sparkle effects */}
        {!isBlown &&
          Array.from({ length: 12 }).map((_, i) => (
            <Sparkle key={i} delay={i * 0.3} />
          ))}

        {/* Multi-tier Colorful Cake */}
        <div className="relative flex flex-col items-center">
          {/* Top Tier */}
          <motion.div
            whileHover={{ y: -5 }}
            className="w-32 h-20 bg-linear-to-b from-yellow-200 to-orange-300 rounded-t-3xl relative z-30 shadow-xl border-b-4 border-orange-400/30"
          >
            <div className="absolute -top-1 w-full h-4 bg-white/60 rounded-t-full blur-[1px]" />
            <div className="flex justify-around pt-4 px-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-red-400 shadow-sm animate-pulse"
                />
              ))}
            </div>
            {/* Drip Effect */}
            <div className="absolute -bottom-1 left-0 w-full flex justify-between px-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-6 bg-white/40 rounded-b-full blur-[1px]"
                  style={{ height: `${Math.random() * 12 + 8}px` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Middle Tier */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-48 h-24 bg-linear-to-b from-pink-300 to-rose-400 rounded-t-3xl -mt-4 relative z-20 shadow-2xl border-b-4 border-rose-500/30 overflow-hidden"
          >
            <div className="absolute top-0 w-full h-full opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: ["#fff", "#60a5fa", "#facc15", "#4ade80"][
                      i % 4
                    ],
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            <div className="absolute top-2 w-full h-6 bg-white/20 blur-[2px]" />
          </motion.div>

          {/* Bottom Tier */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-64 h-28 bg-linear-to-b from-purple-400 to-indigo-500 rounded-t-3xl -mt-4 relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-b-8 border-indigo-600/40"
          >
            <div className="absolute top-4 w-full h-8 bg-white/10 skew-y-1" />
            <div className="flex justify-around pt-8 px-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-white/30 shadow-inner"
                />
              ))}
            </div>
          </motion.div>

          {/* Stand */}
          <div className="w-72 h-4 bg-slate-100 rounded-full -mt-1 shadow-2xl relative z-0" />
          <div className="w-44 h-10 bg-linear-to-b from-slate-200 to-slate-300 rounded-b-[40px] shadow-xl relative z-0" />
        </div>

        {/* The Candle */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-40">
          <div className="w-3 h-20 bg-linear-to-b from-cyan-300 via-blue-400 to-indigo-500 rounded-full shadow-inner border border-white/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 w-1/2" />
          </div>

          <AnimatePresence>
            {!isBlown && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.2 }}
                className="absolute -top-10 w-10 h-16 flex items-center justify-center"
              >
                {/* Flame Layers */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [-3, 3, -3],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute w-8 h-12 bg-orange-500 rounded-full blur-xs shadow-[0_0_30px_#f97316]"
                  style={{ borderRadius: "50% 50% 20% 20% / 70% 70% 30% 30%" }}
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="absolute w-6 h-10 bg-yellow-400 rounded-full blur-[1px]"
                  style={{ borderRadius: "50% 50% 20% 20% / 70% 70% 30% 30%" }}
                />
                <div
                  className="absolute w-3 h-6 bg-white rounded-full opacity-80"
                  style={{ borderRadius: "50% 50% 20% 20% / 70% 70% 30% 30%" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isBlown && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.6, 0], y: -80, x: [-10, 10, -5] }}
                transition={{ duration: 2.5 }}
                className="absolute -top-8 w-6 h-12 bg-white/20 rounded-full blur-xl"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="text-6xl mb-6 inline-block"
            >
              ✨
            </motion.div>
            <p className="text-3xl sm:text-4xl font-cursive text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-white to-pink-200 drop-shadow-lg">
              May your wish come true crybabyy🤍
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
