"use client";
import React, { useState, useCallback } from "react";
import { LockScreen } from "./components/LockScreen";
import { CakeScene } from "./components/CakeScene";
import { LetterScene } from "./components/LetterScene";
import { FinalMessage } from "./components/FinallMessage";

enum Step {
  LOCK,
  CAKE,
  LETTER,
  FINAL,
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.LOCK);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);

  const startExperience = useCallback(() => {
    setIsUnlocked(true);
    setTimeout(() => setCurrentStep(Step.CAKE), 800);
  }, []);

  const handleBlowCandles = useCallback(() => {
    // We set music to true here.
    // On mobile, this direct response to a click/tap is required to allow autoplay.
    setPlayMusic(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-white transition-all duration-1000">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[#0a0a0c] z-[-2]"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-600/15 blur-[120px] rounded-full z-[-1]"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 blur-[120px] rounded-full z-[-1]"></div>

      {/* Music - Coldplay Yellow - Triggers on candle blow */}
      {playMusic && (
        <div className="hidden pointer-events-none absolute opacity-0">
          <iframe
            width="1"
            height="1"
            src="https://www.youtube.com/embed/yKNxeF4KMsY?autoplay=1&mute=0&loop=1&playlist=yKNxeF4KMsY"
            title="Coldplay - Yellow"
            allow="autoplay"
          ></iframe>
        </div>
      )}

      {/* 1. Lock Screen */}
      <div
        className={`w-full h-full absolute inset-0 transition-all duration-1000 z-50 ${
          isUnlocked
            ? "opacity-0 scale-110 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <LockScreen onUnlock={startExperience} />
      </div>

      {/* 2. Cake Scene */}
      <div
        className={`w-full max-w-4xl px-4 transition-all duration-1000 ${
          currentStep === Step.CAKE
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none absolute"
        }`}
      >
        <CakeScene
          onComplete={() => setCurrentStep(Step.LETTER)}
          onBlow={handleBlowCandles}
        />
      </div>

      {/* 3. Letter Scene */}
      <div
        className={`w-full max-w-4xl px-4 transition-all duration-1000 ${
          currentStep === Step.LETTER
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none absolute"
        }`}
      >
        <LetterScene
          onNext={() => {
            setCurrentStep(Step.FINAL);
            // Small delay to ensure the scroll target is rendered
            setTimeout(() => {
              const element = document.getElementById("final-section");
              element?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        />
      </div>

      {/* 4. Final Section */}
      <div
        id="final-section"
        className={`w-full max-w-4xl px-4 transition-all duration-1000 min-h-screen flex items-center justify-center ${
          currentStep === Step.FINAL
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20 pointer-events-none absolute"
        }`}
      >
        <FinalMessage />
      </div>
    </div>
  );
};

export default App;
