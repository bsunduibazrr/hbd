"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { LockScreen } from "./components/LockScreen";
import { CakeStage } from "./components/CakeStage";
import { LetterStage } from "./components/LetterStage";
import { AppStage } from "./types";
import { Background } from "./components/BackGround";

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.LOCK);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <Background />

      <AnimatePresence mode="wait">
        {stage === AppStage.LOCK && (
          <LockScreen key="lock" onUnlock={() => setStage(AppStage.CAKE)} />
        )}

        {stage === AppStage.CAKE && (
          <CakeStage key="cake" onBlown={() => setStage(AppStage.LETTER)} />
        )}

        {stage === AppStage.LETTER && <LetterStage key="letter" />}
      </AnimatePresence>

      {/* Footer Branding */}
    </div>
  );
};

export default App;
