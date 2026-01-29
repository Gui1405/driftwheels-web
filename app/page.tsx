import React from 'react';
import Link from 'next/link';
import { Download, MapPin, Calendar, Users, Shield, Smartphone, Mail, Instagram, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center transform -skew-x-12">
              <span className="font-bold text-black text-lg">D</span>
            </div>
            <span className="font-bold text-xl tracking-tighter">DriftWheels</span>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Funcionalidades</Link>
            <Link href="#app" className="hover:text-white transition-colors">O App</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contato</Link>
          </div>

          {/* CTA Button */}
          <Link 
            href="#download"
            className="hidden md:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            Baixar Agora
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            O App #1 de Drift no Brasil
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            A Cultura do Drift <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              No Seu Bolso.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Encontre pistas, participe de eventos oficiais, gerencie sua garagem e conecte-se com a comunidade automotiva mais apaixonada do país.
          </p>

          <div id="download" className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Apple Store Button */}
            <button className="flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-xl hover:scale-105 transition-transform duration-200 w-full sm:w-auto justify-center">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.61-0.91.61.03 2.34.25 3.44 1.86-3.06 1.35-2.53 5.4 1.55 7.02zM13 5c.67-1.25.68-2.6.28-3.92 1.34.05 2.58.74 3.39 1.95-.62.96-1.8 1.8-3.67 1.97z"/></svg>
               <div className="text-left">
                 <div className="text-[10px] font-semibold uppercase leading-none">Download on the</div>
                 <div className="text-sm font-bold leading-none">App Store</div>
               </div>
            </button>

            {/* Google Play Button */}
            <button className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-sm px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-200 w-full sm:w-auto justify-center">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
               <div className="text-left">
                 <div className="text-[10px] font-semibold uppercase leading-none">Get it on</div>
                 <div className="text-sm font-bold leading-none">Google Play</div>
               </div>
            </button>
          </div>
          
          {/* Mockup Preview (Placeholder) */}
          <div className="mt-20 relative mx-auto max-w-4xl">
             <div className="aspect-video bg-neutral-900 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group">
                {/* Aqui você coloca a imagem real do seu app futuramente */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
                <div className="text-center z-10">
                    <p className="text-gray-500 text-sm mb-2">Preview da Interface</p>
                    <h3 className="text-2xl font-bold text-white">Mapa de Pistas & Feed Social</h3>
                </div>
                {/* <Image src="/app-mockup.png" alt="App Preview" fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity" /> */}
             </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-24 bg-neutral-900/50 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tudo o que um drifteiro precisa</h2>
            <p className="text-gray-400">Desenvolvido por quem vive na pista, para quem vive na pista.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MapPin className="w-8 h-8 text-amber-500" />}
              title="Encontre Pistas"
              desc="Mapa interativo com autódromos e pistas de drift em todo o Brasil. Rotas, horários e valores."
            />
            <FeatureCard 
              icon={<Calendar className="w-8 h-8 text-amber-500" />}
              title="Eventos Oficiais"
              desc="Fique por dentro dos track days, campeonatos e encontros. Compre ingressos e confirme presença."
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8 text-amber-500" />}
              title="Comunidade Ativa"
              desc="Compartilhe seus projetos, fotos e vídeos. Conecte-se com mecânicos e outros pilotos."
            />
          </div>
        </div>
      </section>

      {/* --- TRUST / CTA --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Pronto para acelerar?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Junte-se a milhares de pilotos e entusiastas que já estão usando o DriftWheels.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="#download" className="bg-amber-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Baixar o App Grátis
             </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER (CRUCIAL PARA A APPLE/GOOGLE) --- */}
      <footer className="bg-neutral-950 border-t border-white/10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center transform -skew-x-12">
                  <span className="font-bold text-black text-xs">D</span>
                </div>
                <span className="font-bold text-lg tracking-tighter">DriftWheels</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                A plataforma definitiva para entusiastas de drift. Conectando pistas, pilotos e paixão por carros em um só lugar.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {/* Esses links são OBRIGATÓRIOS na App Store */}
                <li><Link href="/privacy" className="hover:text-amber-500 transition-colors">Política de Privacidade</Link></li>
                <li><Link href="/terms" className="hover:text-amber-500 transition-colors">Termos de Uso</Link></li>
                <li><Link href="/guidelines" className="hover:text-amber-500 transition-colors">Diretrizes da Comunidade</Link></li>
              </ul>
            </div>

            <div id="contact">
              <h4 className="font-bold mb-4">Contato & Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:suporte@driftwheels.com" className="hover:text-amber-500">suporte@driftwheels.com</a>
                </li>
                <li className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    <a href="https://instagram.com/driftwheels" target="_blank" className="hover:text-amber-500">@driftwheels</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} DriftWheels Technology. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Componente Auxiliar para Card
function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
      <div className="mb-6 p-4 bg-black/40 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}