'use client';

import { useEffect, useState, Suspense } from 'react';

function HomeContent() {
  const [status, setStatus] = useState<'landing' | 'redirecting'>('landing');

  useEffect(() => {
    // --- LÓGICA DE REDIRECIONAMENTO ---
    // O Supabase envia o token no hash da URL: https://driftwheels.app/#access_token=...&type=recovery
    // O Next.js roda no servidor e no cliente, precisamos garantir que estamos no navegador (window)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      
      // Se tiver tokens de autenticação na URL...
      if (hash && (hash.includes('access_token') || hash.includes('type=recovery'))) {
        setStatus('redirecting');
        
        // Constrói o Deep Link para o app
        // Pega tudo que está depois do # e repassa para o app
        const appUrl = `driftwheels://reset-password${hash}`;
        
        console.log("Tentando abrir o app em:", appUrl);

        // Tenta abrir o app imediatamente
        window.location.href = appUrl;

        // Se o usuário estiver no PC ou não tiver o app, nada acontece automaticamente.
        // O botão na tela servirá de fallback.
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 selection:bg-orange-500 selection:text-white">
      
      {/* --- MODO REDIRECIONAMENTO (Recuperação de Senha) --- */}
      {status === 'redirecting' && (
        <div className="text-center max-w-md animate-pulse">
          <div className="mb-6 flex justify-center">
             {/* Ícone de Loading/Redirecionamento */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-orange-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Abrindo o DriftWheels...</h1>
          <p className="text-gray-400 mb-8">Estamos te levando para o aplicativo para redefinir sua senha.</p>
          
          <a 
            href={`driftwheels://reset-password${typeof window !== 'undefined' ? window.location.hash : ''}`}
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-900/20"
          >
            Abrir App Manualmente
          </a>
        </div>
      )}

      {/* --- MODO LANDING PAGE (Visitante Normal) --- */}
      {status === 'landing' && (
        <div className="max-w-2xl text-center space-y-8">
          
          {/* Logo Typo */}
          <div className="mb-10">
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter transform -skew-x-12">
              <span className="text-white">DRIFT</span>
              <span className="text-orange-500">WHEELS</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-mono mt-2 tracking-widest uppercase">
              Professional Telemetry System
            </p>
          </div>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
            A telemetria profissional para pilotos de Drift no seu bolso. 
            Meça ângulo, velocidade e Força G em tempo real.
          </p>

          {/* Grid de Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-8">
            <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 hover:border-orange-500/50 transition-colors">
              <h3 className="font-bold text-xl mb-1 text-orange-400">📊 Telemetria</h3>
              <p className="text-sm text-gray-500">Análise detalhada de cada curva e transição.</p>
            </div>
            <div className="p-6 border border-gray-800 rounded-2xl bg-gray-900/50 hover:border-orange-500/50 transition-colors">
              <h3 className="font-bold text-xl mb-1 text-orange-400">🏆 Ranking</h3>
              <p className="text-sm text-gray-500">Dispute com pilotos de todo o mundo.</p>
            </div>
          </div>

          {/* Botões das Lojas (Desativados por enquanto) */}
          <div className="pt-12">
            <p className="text-xs text-gray-600 uppercase font-bold tracking-widest mb-4">Em breve</p>
            <div className="flex justify-center gap-4 opacity-40 cursor-not-allowed">
              <div className="h-12 w-36 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center text-xs font-bold">App Store</div>
              <div className="h-12 w-36 bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center text-xs font-bold">Google Play</div>
            </div>
          </div>
          
          <footer className="pt-16 text-xs text-gray-800">
            &copy; {new Date().getFullYear()} DriftWheels. Todos os direitos reservados.
          </footer>
        </div>
      )}
    </main>
  );
}

// O Suspense é necessário no Next.js novo para usar useSearchParams ou window logic em build time
export default function Home() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen text-white flex items-center justify-center">Carregando...</div>}>
      <HomeContent />
    </Suspense>
  );
}