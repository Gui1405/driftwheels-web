import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OPÇÃO RECOMENDADA: Redirect em vez de Rewrite
  // Isso garante que o navegador renderize o HTML do Supabase sem interferência do proxy da Vercel.
  // async redirects() {
  //   return [
  //     {
  //       source: '/share/:type/:id',
  //       destination: 'https://xowanwpfduspyptmblkm.supabase.co/functions/v1/share?type=:type&id=:id',
  //       permanent: false,
  //     },
  //   ];
  // },

  /* 
  // SE VOCÊ REALMENTE QUISER MANTER O REWRITE (URL do seu site), use esta configuração:
  async rewrites() {
    return [
      {
        source: '/share/:type/:id',
        destination: 'https://xowanwpfduspyptmblkm.supabase.co/functions/v1/share?type=:type&id=:id',
      },
    ];
  },
  // Remova o bloco 'headers' que você tinha, pois ele pode estar sobrescrevendo o Content-Type 
  // de forma incorreta ou causando o erro de renderização.
  */
};

export default nextConfig;