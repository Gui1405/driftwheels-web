'use client';

import { useEffect, useState, Suspense } from 'react';

function HomeContent() {
  const [status, setStatus] = useState<'landing' | 'redirecting'>('landing');

  useEffect(() => {
    // --- LÓGICA CRÍTICA DE REDIRECIONAMENTO (NÃO REMOVER) ---
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#', '?'));
      
      const accessToken = params.get('access_token');
      const type = params.get('type');

      // 1. Recuperação de Senha
      if (accessToken && type === 'recovery') {
        setStatus('redirecting');
        window.location.href = `driftwheels://reset-password${hash}`;
      } 
      // 2. Login Social / Confirmação de Email
      else if (accessToken) {
        setStatus('redirecting');
        window.location.href = `driftwheels://auth-callback${hash}`;
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 relative overflow-hidden selection:bg-orange-500 selection:text-white font-sans">
      
      {/* Efeito de Fundo (Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* --- ESTADO 1: REDIRECIONANDO (Ocorre ao clicar no email) --- */}
      {status === 'redirecting' && (
        <div className="text-center max-w-md animate-pulse z-10">
          <div className="mb-6 flex justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Abrindo o DriftWheels...</h1>
          <p className="text-gray-400 mb-8">Redirecionando para o aplicativo.</p>
          
          <a 
            href={`driftwheels://auth-callback${typeof window !== 'undefined' ? window.location.hash : ''}`}
            className="px-8 py-3 bg-zinc-800 border border-zinc-700 hover:border-orange-500 text-white rounded-xl font-bold transition-all"
          >
            Abrir App Manualmente
          </a>
        </div>
      )}

      {/* --- ESTADO 2: LANDING PAGE (Visitante Normal) --- */}
      {status === 'landing' && (
        <div className="max-w-3xl text-center space-y-12 z-10">
          
          {/* Logo / Título */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter transform -skew-x-12">
              <span className="text-white">DRIFT</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">WHEELS</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide">
              TELEMETRIA PROFISSIONAL & COMUNIDADE
            </p>
          </div>

          {/* Badge "Em Breve" */}
          <div className="inline-block px-6 py-2 border border-orange-500/30 rounded-full bg-orange-500/10 backdrop-blur-md">
            <span className="text-orange-400 text-sm font-bold tracking-widest uppercase animate-pulse">
              Em Breve um App
            </span>
          </div>

          {/* Botões das Lojas (Desativados visualmente) */}
          <div className="pt-8 flex flex-col md:flex-row justify-center gap-6 items-center opacity-60">
            <div className="flex flex-col items-center gap-2 group cursor-not-allowed">
                <div className="h-14 w-44 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:border-zinc-700 transition-all">
                   App Store
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-not-allowed">
                <div className="h-14 w-44 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-sm font-bold text-gray-400 group-hover:border-zinc-700 transition-all">
                  ▶ Google Play
                </div>
            </div>
          </div>
          
          <footer className="fixed bottom-6 left-0 right-0 text-center text-[10px] text-zinc-700 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} DriftWheels. Todos os direitos reservados.
          </footer>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-zinc-600">Carregando...</div>}>
      <HomeContent />
    </Suspense>
  );
}