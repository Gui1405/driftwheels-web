'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Gauge } from 'lucide-react';

export default function UltraMinimalistComingSoon() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center overflow-hidden selection:bg-[#FF4500] selection:text-black">
      
      {/* Fundo com Grid e Brilho */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#FF4500]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
      </div>

      {/* Marquee (Faixa) Diagonal de Fundo */}
      <div className="absolute w-[150%] rotate-[-10deg] opacity-20 pointer-events-none">
        <div className="bg-[#FF4500] py-4 flex overflow-hidden border-y-4 border-black">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i} className="font-black text-4xl mx-8 tracking-tighter uppercase italic flex items-center gap-4 text-black">
                DRIFTWHEELS <Gauge className="w-8 h-8" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CONTEÚDO CENTRAL */}
      <main className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/icon.png" 
            alt="DriftWheels Logo" 
            className="h-24 md:h-32 mx-auto mb-12 drop-shadow-[0_0_20px_rgba(255,69,0,0.6)]" 
          />
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
            EM BREVE
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-12 font-light tracking-wide">
            A nova era da telemetria e comunidade drift está chegando.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a 
              href="https://instagram.com/driftwheels.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-[#FF4500] hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Siga no Instagram
            </a>
            
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
              @driftwheels.app
            </span>
          </div>
        </motion.div>
      </main>

      {/* Rodapé fixo */}
      <footer className="absolute bottom-10 w-full text-center">
        <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
          {new Date().getFullYear()} DriftWheels &bull; Made with 🔥 by Guilherme
        </p>
      </footer>
    </div>
  );
}