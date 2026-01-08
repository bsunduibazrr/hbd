"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LetterSceneProps {
  onNext: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsRevealed(true), 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 md:py-20 min-h-screen">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.8 } }}
            className="text-center space-y-8 md:space-y-12 w-full px-4"
          >
            <h2 className="text-xl md:text-4xl font-serif text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] leading-relaxed max-w-md mx-auto">
              Tap to hear the secrets the stars have for you ✌🏻
            </h2>

            <div className="envelope-wrapper scale-[0.65] sm:scale-90 md:scale-100">
              <motion.div
                className={`envelope mx-auto cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.6)] rounded-b-lg flex items-center justify-center border-white/10 ${
                  isOpen ? "open" : ""
                }`}
                onClick={handleOpen}
                whileHover={!isOpen ? { scale: 1.05, rotate: -1 } : {}}
                animate={isOpen ? { rotateY: 180, scale: 1.1 } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="flap"></div>
                <div className="letter flex flex-col items-start p-6 space-y-2 bg-linear-to-br from-white to-gray-50 overflow-hidden shadow-inner">
                  <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-3/4 h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-full h-1 bg-gray-200 rounded-full"></div>
                  <div className="w-1/2 h-1 bg-pink-100 rounded-full"></div>
                </div>
                {!isOpen && (
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="z-10 text-pink-500 text-6xl md:text-8xl drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]"
                  >
                    ✉️
                  </motion.div>
                )}
              </motion.div>
            </div>

            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-pink-400 font-medium text-xs md:text-lg italic tracking-[0.2em] md:tracking-[0.3em] uppercase px-6"
            >
              A special letter, written just for you...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 100 }}
            className="w-full max-w-xl md:max-w-2xl bg-white/95 backdrop-blur-xl p-6 sm:p-10 md:p-24 shadow-[0_50px_120px_rgba(0,0,0,0.4)] rounded-6 md:rounded-[40px] border-t-4 md:border-t-15px border-pink-500 relative overflow-hidden mx-auto"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-64 md:h-64 bg-pink-100/20 blur-2xl md:blur-[80px] rounded-full -mr-12 md:-mr-32 -mt-12 md:-mt-32"></div>

            <div className="absolute top-4 left-6 md:top-8 md:left-12 text-pink-100 text-[6rem] md:text-[12rem] select-none font-serif opacity-30 leading-none h-12 md:h-20 overflow-hidden">
              “
            </div>

            <div className="relative z-10 space-y-5 md:space-y-12 text-gray-800 leading-relaxed font-serif text-lg sm:text-xl md:text-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block"
              >
                <p className="text-pink-600 font-bold border-b-2 md:border-b-4 border-pink-50 pb-1 mb-1 italic">
                  Shining Birthday Star,
                </p>
                <div className="h-0.5 md:h-1 w-full bg-linear-to-r from-pink-400 to-transparent rounded-full"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="indent-4 md:indent-10 first-letter:text-3xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-pink-500 first-letter:mr-1 first-letter:float-left"
              >
                Төрсөн өдөрийн мэнд хүргэе ээ🥳🫶🏻 Ингээд хаана ч яваа газартаа
                эерэг, дулаан аурагаа тарааж явдаг, инээмсэглэл нь ховор
                гэрэлийг, зүрх нь төгс төгөлдөр энэрэлээр дүүрэн газарыг
                агуулдаг, ухаалаг нэгэн 19 нас хүржээ.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="indent-4 md:indent-10"
              >
                Би чамайг энэ ирж байгаа насандаа маш их зүйлийг хийж бүтээж,
                амжуулж, зорьсон зорилгодоо заавал хүрнэ гэдэгт жоохон ч гэсэн
                эргэлзэхгүй байна аа. Чи миний мэдэх хамгийн мундаг, хичээнгүй
                хүмүүсийн нэг шүү. Нөгөө талаараа чамайг цаашид олон сорилт,
                хэцүү зүйлс хүлээж байгаа нь ойлгомжтой. Тэр бүхэнд шантралгүй,
                бүгдийг нь давж, өөрийнхөөрөө зохицуулчихна гэдэгт чинь итгэж
                байна. Чи чадна аа.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="indent-4 md:indent-10"
              >
                Би ирээдүйд чамайг сайн сайхан яваасай л гэж хүснэ. Чамд захиж
                хэлэхэд, биеэ сайн бодоорой, эрүүл байгаарай, хоол ундаа сайн
                идээрэй, бага ядраарай, нойроо сайн аваарай, зорилгодоо заавал
                хүрээрэй, гол нь хөгжилдөхөө битгий мартаарай.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="indent-4 md:indent-10"
              >
                If you were a star, you would be the brightest in this world⭐️
                <br />
                <br />
                If you were a flower, you would be the one that lasts the
                longest💐
                <br /> <br />
                If you were eyes, you would see the truth without hiding it👁️
                <br /> <br />
                If you were a road, you would never lead others astray🛣️
                <br />
                <br /> If you were fire, you would warm, not burn🔥
                <br />
                <br /> If you were the sea, you would hold, not sink it🌊
                <br />
                <br /> If you were a question, you would be meaningful even
                without an answer⳺
                <br />
                <br />
                If you were an ending, you would be as bright as a beginning⭐️
                <br />
                <br />
                If you were reality, you would be more beautiful than any
                dream.❤️
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="indent-4 md:indent-10"
              >
                Дунд ангид байхад би чамд нэг уран зохиолын хичээлийн ном
                өгөхдөө бүр нэлээн сандарсан шүү хха. Маскарадын орой чамайг
                бүжигэнд урихдаа их л зориг гаргаж билээ хха. Тэр үед
                зөвшөөрөлгүй шууд биеэнд чинь хүрчихсэн, тэрэнд үнэхээр их
                харамсдаг даа. Дараа нь уучлалт гуйж чадаагүй энэ захиан дээр л
                гуйх хувьтай байж дээ. Үнэхээр уучлаарай намайг🙏.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="indent-4 md:indent-10"
              >
                Инээхээрээ зөндөө хөөрхөн шүү инээмсэглэлээрээ байнга дулаан
                аурагаа тарааж яваарай ТӨГС хүүхэд минь. Чи энийг уншихгүй байж
                ч магадгүй л дээ, хэрвээ уншиж байвал үнэхээр их БАЯРЛАЛАА,
                Ядаргаатай санагдсан зүйлс олон байсан байх УУЧЛААРАЙ
                <br />
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="indent-4 md:indent-10"
              >
                Сайхан баярлаарай, энэ өдөр зөвхөн чиний өдөр шүү, энэ өдөрөө
                үнэхээр жаргалтайгаар өнгөрөөгөөрэй мундаг аа. <br />
                Энэ хүртэл уншсан чамд ахиад баярлалаа. Баяртайй
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 }}
                className="text-right pt-6 md:pt-16 border-t border-gray-100 mt-4 md:mt-10"
              >
                <p className="text-2xl md:text-xl italic font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-purple-600 font-serif">
                  Level 19 unlocked, Keep shining!
                </p>
                <p className="text-blue-500 text-[15px] max-sm:mt-3 md:text-sm    md:tracking-[0.4em] mb-1 md:mb-3 opacity-60">
                  The moon is beautiful, isn't it?
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 5.5 }}
              className="mt-8 md:mt-24 flex justify-center"
            >
              <button
                onClick={onNext}
                className="group relative px-6 md:px-14 py-3 md:py-6 bg-black  text-white rounded-full font-bold text-sm md:text-xl shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <span className="relative z-10">Амжилт</span>
                <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-3xl transition-all rounded-full"></div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
