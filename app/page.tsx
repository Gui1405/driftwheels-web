'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Download, MapPin, Calendar, Users, Mail, Instagram, 
  Activity, Zap, Trophy, CheckCircle2, XCircle, 
  Smartphone, ChevronDown, Rocket, Globe, Gauge, Menu, X
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- COMPONENTES VISUAIS ---

// 1. FAIXA DE TEXTO INFINITA (MARQUEE)
const ScrollingBanner = ({ 
  direction = 1, 
  text, 
  skewInverse = false,
  horizontal = false,
  className,
  textColor = "text-black"
}: { 
  direction?: number, 
  text: string, 
  skewInverse?: boolean,
  horizontal?: boolean,
  className?: string,
  textColor?: string
}) => {
  return (
    <div className={cn(
      "w-full overflow-hidden bg-[#FF4500] py-2 flex relative z-20 border-y-4 border-black",
      horizontal 
        ? "" 
        : skewInverse ? "transform skew-y-2" : "transform -skew-y-2",
      className
    )}>
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: direction > 0 ? [0, -1000] : [-1000, 0] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className={cn("font-black text-sm md:text-lg mx-4 md:mx-8 tracking-widest uppercase italic flex items-center gap-4", textColor)}>
            {text} <Gauge className={cn("w-4 h-4 md:w-5 md:h-5", textColor)} />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// 2. Section Title
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="text-center mb-10 md:mb-16 px-4 relative z-10">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[#FF4500] font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase mb-3 block"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl md:text-5xl font-black text-white uppercase italic tracking-tighter py-2 leading-tight drop-shadow-lg"
    >
      {children}
    </motion.h2>
  </div>
);

// 3. Feature Card
const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-3xl hover:bg-neutral-800/50 transition-all hover:border-[#FF4500]/50 group cursor-default relative overflow-hidden flex flex-col items-center text-center shadow-lg"
  >
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#FF4500] blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    <div className="mb-6 p-4 bg-black w-fit rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/50 text-[#FF4500]">
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-[#FF4500] transition-colors uppercase italic">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-xs md:text-sm">{desc}</p>
  </motion.div>
);

// 4. Pricing Card
const PricingCard = ({ title, price, subPrice, features, recommended = false }: { title: string, price: string, subPrice?: string, features: { name: string, included: boolean }[], recommended?: boolean }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={cn(
      "p-6 md:p-8 rounded-3xl border relative flex flex-col h-full transition-all duration-300 backdrop-blur-md",
      recommended 
        ? "bg-neutral-900/80 border-[#FF4500] shadow-[0_0_50px_rgba(255,69,0,0.15)]" 
        : "bg-black/60 border-white/10"
    )}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF4500] text-black text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap">
        Recomendado
      </div>
    )}
    <div className="mb-6 md:mb-8 text-center border-b border-white/5 pb-6 md:pb-8">
      <h3 className="text-sm md:text-lg font-bold text-gray-400 mb-2 uppercase tracking-wide">{title}</h3>
      <div className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">{price}</span>
        {subPrice && <span className="text-gray-500 text-[10px] mt-2 font-mono">{subPrice}</span>}
      </div>
    </div>
    <ul className="space-y-3 md:space-y-4 mb-8 flex-1">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-left">
          {feature.included ? (
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#FF4500] shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-800 shrink-0" />
          )}
          <span className={feature.included ? "text-gray-200" : "text-gray-700 line-through"}>
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
    <Link 
      href="#download" 
      className={cn(
        "w-full py-3 md:py-4 rounded-xl font-bold text-center transition-all uppercase tracking-widest text-[10px] md:text-xs",
        recommended 
          ? "bg-[#FF4500] text-black hover:bg-[#ff5e22] shadow-lg shadow-[#FF4500]/20" 
          : "bg-white/10 text-white hover:bg-white/20"
      )}
    >
      {recommended ? "Começar Agora" : "Baixar Grátis"}
    </Link>
  </motion.div>
);

// 5. Mockup Component
const PhoneMockup = ({ 
  imageSrc, 
  className, 
  style, 
  isCenter = false 
}: { 
  imageSrc?: string, 
  className?: string, 
  style?: any, 
  isCenter?: boolean 
}) => (
  <motion.div style={style} className={cn("relative pointer-events-none z-10", className)}>
    <div className={cn(
      "relative bg-[#050505] rounded-[20px] md:rounded-[40px] border-[4px] md:border-[6px] border-[#1a1a1a] overflow-hidden aspect-[9/19] h-auto w-full",
      isCenter ? "shadow-[0_0_30px_rgba(255,69,0,0.3)] md:shadow-[0_0_60px_rgba(255,69,0,0.3)]" : "shadow-xl opacity-40 md:opacity-60"
    )}>
      <div className="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-[25%] h-[8px] md:h-[15px] bg-black rounded-full z-50"></div>
      <div className="absolute inset-0 bg-black">
        {imageSrc ? (
          <img src={imageSrc} alt="App Screenshot" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-5 pt-8 md:pt-12 pb-5 md:pb-10">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-20 h-20 md:w-40 md:h-40 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[5px] md:border-[10px] border-[#222]"></div>
                <div className="absolute inset-0 rounded-full border-[5px] md:border-[10px] border-t-[#FF4500] border-r-[#FF4500] border-b-transparent border-l-transparent rotate-[135deg]"></div>
                <div className="text-center z-10">
                  <span className="block text-xl md:text-5xl font-black text-white italic tracking-tighter">128</span>
                  <span className="text-[5px] md:text-[10px] text-[#FF4500] font-bold tracking-[0.2em]">KM/H</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3 relative">
              <div className="bg-[#111] p-2 md:p-3 rounded-lg md:rounded-xl border border-white/5 text-center">
                <span className="text-[5px] md:text-[8px] text-gray-500 font-bold block mb-1 uppercase">G-Force</span>
                <span className="text-[10px] md:text-lg font-bold text-white">1.2 G</span>
              </div>
              <div className="bg-[#111] p-2 md:p-3 rounded-lg md:rounded-xl border border-white/5 text-center">
                <span className="text-[5px] md:text-[8px] text-gray-500 font-bold block mb-1 uppercase">Angle</span>
                <span className="text-[10px] md:text-lg font-bold text-white">45°</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ySide = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const navLinks = [
    { name: 'Funcionalidades', href: '#features' },
    { name: 'História', href: '#story' },
    { name: 'Planos', href: '#pricing' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF4500] selection:text-black overflow-x-hidden">
      
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 transition-all" id='top'>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="#top" className="flex items-center hover:opacity-90 transition-all relative group">
            <div className="absolute inset-0 bg-[#FF4500]/30 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src="/icon.png" 
              alt="DriftWheels" 
              className="h-12 md:h-16 w-auto object-contain relative z-10 drop-shadow-[0_0_12px_rgba(255,69,0,0.6)] group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-300 hover:text-[#FF4500] transition-all relative py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF4500] transition-all group-hover:w-full shadow-[0_0_8px_#FF4500]" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-[#FF4500] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-8 gap-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-black uppercase tracking-[0.2em] text-gray-200 hover:text-[#FF4500] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION - Added padding-top to account for fixed navbar height */}
      <section className="relative pt-16 md:pt-20 min-h-screen flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-[#FF4500]/10 border border-[#FF4500]/20 rounded-full blur-[100px] z-0" />
            <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-10 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-10 md:py-0">
            
            {/* Left Side: Content */}
            <div className="text-left flex flex-col items-start order-2 md:order-1">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/30 text-[#FF4500] text-[10px] font-bold uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(255,69,0,0.1)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] animate-pulse"></span>
                O App #1 de Drift do Mundo
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-6 leading-[0.9] uppercase italic text-white drop-shadow-2xl"
              >
                DOMINE A <br />
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] via-[#ff8c00] to-[#FF4500] bg-[length:200%_auto] animate-gradient pb-2">
                  ARTE DO DRIFT
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-lg lg:text-xl text-gray-300 max-w-lg mb-8 leading-relaxed font-light"
              >
                Telemetria profissional, análise por IA e uma comunidade global exclusiva.
                Seu smartphone agora é seu engenheiro de pista.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                id="download"
              >
                <Link href="https://apps.apple.com" className="flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-2xl hover:scale-105 transition-transform w-full sm:w-auto justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                  <div className="text-left">
                    <div className="text-[9px] font-bold uppercase leading-none opacity-60">Baixar na</div>
                    <div className="text-sm font-bold leading-none">App Store</div>
                  </div>
                </Link>

                <Link href="https://play.google.com/store/apps/details?id=com.the_one.DriftWheels" className="flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-md px-6 py-3.5 rounded-2xl hover:bg-black/70 hover:border-[#FF4500]/50 transition-all w-full sm:w-auto justify-center group">
                  <svg className="w-6 h-6 group-hover:fill-[#FF4500] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                  <div className="text-left">
                    <div className="text-[9px] font-bold uppercase leading-none opacity-60 text-white">Baixar no</div>
                    <div className="text-sm font-bold leading-none text-white">Google Play</div>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Right Side: Mockups */}
            <div className="relative h-[350px] sm:h-[450px] md:h-[550px] flex items-center justify-center order-1 md:order-2">
              <div className="relative w-full max-w-[450px]">
                <PhoneMockup 
                    imageSrc="/assets/tela_smartphone.png"
                    className="absolute left-[-5%] top-[10%] w-[130px] sm:w-[170px] md:w-[210px] -rotate-[15deg] z-0 opacity-40 md:opacity-60"
                    style={{ y: ySide }}
                />
                <PhoneMockup 
                    imageSrc="/assets/tela_smartphone3.png"
                    className="absolute right-[-5%] top-[10%] w-[130px] sm:w-[170px] md:w-[210px] rotate-[15deg] z-0 opacity-40 md:opacity-60"
                    style={{ y: ySide }}
                />
                <PhoneMockup 
                    imageSrc="/assets/tela_smartphone2.png"
                    isCenter={true}
                    className="relative w-[170px] sm:w-[230px] md:w-[270px] mx-auto z-10"
                    style={{ y }}
                />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[100px] bg-[#FF4500] blur-[100px] opacity-20 pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DIVISÓRIA DIAGONAL 1 */}
      <ScrollingBanner text="DRIFT • TELEMETRY • SPEED • COMMUNITY •" />

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 md:py-24 relative bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-5 bg-center"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle subtitle="TECNOLOGIA DE PONTA">Funcionalidades</SectionTitle>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard delay={0.1} icon={<Activity className="w-6 h-6 md:w-8 md:h-8" />} title="Telemetria & IA" desc="Não 'ache', tenha certeza. Gráficos de Força G, velocidade e ângulo. Nosso Coach IA analisa cada curva para você melhorar seu traçado." />
            <FeatureCard delay={0.2} icon={<Zap className="w-6 h-6 md:w-8 md:h-8" />} title="Sessões ao Vivo" desc="Crie 'Parties' e veja seus amigos na pista em tempo real. Ranking dinâmico que muda a cada drift realizado." />
            <FeatureCard delay={0.3} icon={<MapPin className="w-6 h-6 md:w-8 md:h-8" />} title="Mapa de Pistas" desc="O maior banco de dados de autódromos e spots de drift do mundo. Rotas, preços e check-in integrado." />
            <FeatureCard delay={0.4} icon={<Users className="w-6 h-6 md:w-8 md:h-8" />} title="Comunidade Focada" desc="Sem distrações. Um feed exclusivo para projetos, onboards e resenha técnica com quem entende do assunto." />
            <FeatureCard delay={0.5} icon={<Trophy className="w-6 h-6 md:w-8 md:h-8" />} title="Ranking & XP" desc="Gamificação real. Suba de nível, desbloqueie badges exclusivas e dispute o topo do ranking mundial." />
            <FeatureCard delay={0.6} icon={<Smartphone className="w-6 h-6 md:w-8 md:h-8" />} title="Garagem Digital" desc="Cadastre seus carros, mods e specs. Tenha o histórico de manutenção e setups na palma da mão." />
          </div>
        </div>
      </section>

      {/* DIVISÓRIA DIAGONAL 2 */}
      <ScrollingBanner direction={-1} text="SMOKE • TIRES • ENGINE • PASSION •" skewInverse={true} />

      {/* STORY SECTION */}
      <section id="story" className="py-16 md:py-24 relative overflow-hidden bg-black">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#FF4500]/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-block px-3 py-1 mb-4 md:mb-6 border border-[#FF4500] text-[#FF4500] text-[10px] md:text-xs font-bold rounded-full uppercase tracking-widest">Sobre o Projeto</div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight uppercase italic text-white py-2">Feito por quem vive <br /><span className="text-[#FF4500]">dentro da pista.</span></h2>
            <div className="space-y-4 md:space-y-6 text-gray-400 text-sm md:text-lg leading-relaxed">
              <p>O DriftWheels nasceu de uma frustração pessoal: a falta de ferramentas sérias para a nossa comunidade. Grupos de mensagens bagunçados e falta de dados técnicos não deveriam ser o padrão.</p>
              <p>Eu sou desenvolvedor, mas antes disso, sou drifteiro. Criei o aplicativo que eu queria usar. Uma ferramenta que une a precisão da telemetria com a paixão da comunidade global.</p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-6 md:mt-8">
                 <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center shrink-0">
                    <img src="/icon.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain opacity-100" />
                 </div>
                 <div>
                    <p className="text-white font-bold text-base md:text-lg">Guilherme e Denis</p>
                    <p className="text-[10px] md:text-xs text-[#FF4500] uppercase tracking-wide font-bold">Fundadores (Pai e Filho)</p>
                 </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative mt-8 md:mt-0">
             <div className="aspect-square rounded-[2rem] md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <div className="absolute inset-0 bg-[url('/assets/team.jpeg')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                   <p className="text-2xl md:text-4xl font-black text-white italic drop-shadow-lg leading-none uppercase">KEEP <br /><span className="text-[#FF4500]">DRIFTING</span> <br />FUN.</p>
                </div>
             </div>
             <div className="absolute -bottom-6 -right-6 w-24 md:w-32 h-24 md:h-32 bg-[#FF4500] rounded-full blur-[60px] md:blur-[80px] opacity-30"></div>
          </motion.div>
        </div>
      </section>

      {/* DIVISÓRIA HORIZONTAL */}
      <ScrollingBanner text="TRACK DAY • STREET • PRO • AMATEUR •" horizontal={true} />

      {/* PRICING SECTION */}
      <section id="pricing" className="py-16 md:py-24 relative bg-neutral-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle subtitle="INVESTIMENTO">Escolha seu Setup</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <PricingCard title="Piloto Iniciante" price="Grátis" features={[{ name: "Acesso ao Mapa de Pistas", included: true }, { name: "Participar de Sessões (Parties)", included: true }, { name: "Telemetria Básica (Velocidade)", included: true }, { name: "Garagem (Limitada a 1 carro)", included: true }, { name: "Coach IA Avançado", included: false }, { name: "Exportação de Dados CSV", included: false }, { name: "Badge de Apoiador", included: false }]} />
            <PricingCard title="Piloto PRO" price="R$ 19,90" subPrice="/mês ou R$ 199,00/ano" recommended={true} features={[{ name: "Tudo do plano Grátis", included: true }, { name: "Coach IA Avançado ilimitado", included: true }, { name: "Gráficos de Telemetria G-Force & Ângulo", included: true }, { name: "Garagem Ilimitada", included: true }, { name: "Exportação de Dados CSV", included: true }, { name: "Badge de Apoiador PRO", included: true }, { name: "Acesso antecipado a novas features", included: true }]} />
          </div>
          <p className="text-center text-gray-500 text-[10px] md:text-sm mt-8 max-w-lg mx-auto px-4">* O plano PRO ajuda a manter os servidores e o desenvolvimento de novas features. Cancele quando quiser via loja de aplicativos.</p>
        </div>
      </section>

      {/* FAIXA DE TRANSIÇÃO ESTILIZADA (SESSÕES) */}
      <ScrollingBanner 
        text="FULL THROTTLE • NO LIMITS • MAXIMUM ANGLE •" 
        horizontal={true} 
        className="bg-black border-y-2 border-[#FF4500]/30 !py-4"
        textColor="text-[#FF4500]"
      />

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24 bg-black relative">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold mb-8 md:mb-10 text-center uppercase tracking-widest text-[#FF4500]">Perguntas Frequentes</h2>
            <div className="space-y-4">
                <details className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/5 group cursor-pointer transition-colors hover:bg-white/10 open:bg-white/10 open:border-[#FF4500]/30">
                    <summary className="font-bold flex justify-between items-center list-none text-gray-200 group-hover:text-[#FF4500] transition-colors text-base md:text-lg">O aplicativo funciona offline?<ChevronDown className="w-4 h-4 md:w-5 md:h-5 group-open:rotate-180 transition-transform text-[#FF4500]" /></summary>
                    <p className="mt-4 text-gray-400 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">A gravação da telemetria funciona offline! Porém, para salvar os dados na nuvem, ver o ranking e usar o mapa, você precisará de uma conexão com a internet.</p>
                </details>
                <details className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/5 group cursor-pointer transition-colors hover:bg-white/10 open:bg-white/10 open:border-[#FF4500]/30">
                    <summary className="font-bold flex justify-between items-center list-none text-gray-200 group-hover:text-[#FF4500] transition-colors text-base md:text-lg">Quais pistas estão mapeadas?<ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform text-[#FF4500]" /></summary>
                    <p className="mt-4 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">Já mapeamos os principais autódromos globais e diversos spots de drift. A comunidade também pode sugerir novas pistas diretamente pelo app.</p>
                </details>
                <details className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/5 group cursor-pointer transition-colors hover:bg-white/10 open:bg-white/10 open:border-[#FF4500]/30">
                    <summary className="font-bold flex justify-between items-center list-none text-gray-200 group-hover:text-[#FF4500] transition-colors text-base md:text-lg">Preciso de algum sensor extra no carro?<ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform text-[#FF4500]" /></summary>
                    <p className="mt-4 text-gray-400 text-xs md:text-sm leading-relaxed border-t border-white/5 pt-4">Não! O DriftWheels usa os sensores avançados do seu smartphone (Giroscópio, Acelerômetro e GPS de alta precisão) para calcular tudo. Basta prender bem o celular no painel.</p>
                </details>
            </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-[#FF4500]">
        <div className="absolute inset-0 bg-[url('/assets/grid.svg')] opacity-20 bg-center"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-7xl font-black mb-6 md:mb-8 text-black uppercase italic tracking-tighter">PRONTO PARA ACELERAR?</h2>
          <p className="text-base md:text-xl text-black/80 mb-8 md:mb-12 font-bold max-w-2xl mx-auto">Junte-se a milhares de pilotos e faça parte da maior comunidade de drift do mundo hoje mesmo.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
             <Link href="#download" className="bg-black text-white font-extrabold py-4 md:py-5 px-10 md:px-12 rounded-xl md:rounded-2xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 shadow-2xl transform hover:-translate-y-1 group text-sm md:text-base">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />BAIXAR AGORA
             </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 pt-16 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="col-span-1 md:col-span-2 md:pr-8">
              <Link href="#top" className="flex items-center gap-2 mb-6 cursor-pointer w-fit group">
                 <img 
                    src="/icon.png" 
                    alt="DriftWheels" 
                    className="h-16 md:h-24 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all drop-shadow-[0_0_10px_rgba(255,69,0,0.3)]" 
                 />
              </Link>
              <p id='contato' className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm">DriftWheels é uma marca registrada. Desenvolvido com paixão para impulsionar o cenário automobilístico global.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 md:mb-6 text-white uppercase tracking-wider text-[10px] md:text-xs">Legal</h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-gray-400">
                <li><Link href="/terms" className="hover:text-[#FF4500] transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacy" className="hover:text-[#FF4500] transition-colors">Política de Privacidade</Link></li>
                <li><Link href="/data" className="hover:text-[#FF4500] transition-colors">Dados & Segurança</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 md:mb-6 text-white uppercase tracking-wider text-[10px] md:text-xs">Social</h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-gray-400">
                <li className="flex items-center gap-3"><Instagram className="w-4 h-4 text-[#FF4500]" /><a href="https://instagram.com/driftwheels" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#FF4500]" /><a href="mailto:hello@driftwheels.app" className="hover:text-white transition-colors">Email</a></li>
                <li className="flex items-center gap-3"><Globe className="w-4 h-4 text-[#FF4500]" /><a href="https://driftwheels.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">driftwheels.app</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] gap-4 text-center">
            <p>&copy; {new Date().getFullYear()} DriftWheels. Todos os direitos reservados.</p>
            <p>Made by Guilherme with <span className="text-[#FF4500]">🔥</span> & Tires.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
