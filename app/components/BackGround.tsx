"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const FloatingElement: React.FC<{
  color: string;
  size: number;
  delay: number;
  duration: number;
  left: number;
}> = ({ color, size, delay, duration, left }) => {
  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0, x: `${left}vw` }}
      animate={{
        y: "-10vh",
        opacity: [0, 0.6, 0.6, 0],
        x: [`${left}vw`, `${left + 5}vw`],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute rounded-full blur-xl pointer-events-none"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
};

export const Background: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const elements = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      color: ["#f472b6", "#60a5fa", "#fbbf24", "#a78bfa", "#34d399"][i % 5],
      size: Math.random() * 60 + 20,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 15,
      left: Math.random() * 100,
    }));
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-slate-950" />;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-linear-to-b from-slate-950 via-purple-950 to-slate-950">
      {elements.map((el) => (
        <FloatingElement key={el.id} {...el} />
      ))}
      <div className="absolute inset-0  from-transparent via-slate-950/40 to-slate-950 opacity-60 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]" />
    </div>
  );
};
