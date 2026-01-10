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
};

export default nextConfig;