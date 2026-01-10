import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/share/:type/:id',
        destination: 'https://xowanwpfduspyptmblkm.supabase.co/functions/v1/share?type=:type&id=:id',
      },
    ]
  },
};

export default nextConfig;
