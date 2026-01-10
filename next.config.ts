import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. REWRITES: Redireciona o link bonito para a Edge Function do Supabase
  async rewrites() {
    return [
      {
        source: '/share/:type/:id',
        destination: 'https://xowanwpfduspyptmblkm.supabase.co/functions/v1/share?type=:type&id=:id',
      },
    ];
  },

  // 2. HEADERS: Força o navegador a renderizar o HTML (Resolve o problema do código na tela)
  async headers() {
    return [
      {
        source: '/share/:path*', // Aplica a qualquer rota dentro de /share/
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8', 
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;