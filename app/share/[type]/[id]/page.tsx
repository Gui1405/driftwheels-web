import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

interface Props {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

// 1. GERAR METADADOS DINÂMICOS
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let title = "DriftWheels";
  let description = "Comunidade de Drift e Performance";
  let imageUrl = "https://driftwheels.app/assets/logo.png";

  try {
    if (type === "post") {
      const { data: post } = await supabase
        .from("posts")
        .select("caption, image_url, profiles(username)")
        .eq("id", id)
        .single();
      
      if (post) {
        // Correção de tipagem: acessando o username de forma segura
        const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
        title = `Post de ${profile?.username || "Piloto"}`;
        description = post.caption || description;
        if (post.image_url) imageUrl = post.image_url;
      }
    } else if (type === "profile") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, car_model, avatar_url")
        .eq("id", id)
        .single();
      
      if (profile) {
        title = `${profile.username} no DriftWheels`;
        description = profile.car_model ? `Piloto de ${profile.car_model}` : description;
        if (profile.avatar_url) imageUrl = profile.avatar_url;
      }
    }
  } catch (e) {
    console.error("Erro ao buscar metadados:", e);
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
      type: 'website',
    },
  };
}

// 2. COMPONENTE DA PÁGINA
export default async function SharePage({ params }: Props) {
  const { type, id } = await params;
  const appScheme = `driftwheels://${type}/${id}`;
  const fallbackUrl = "https://driftwheels.app";

  return (
    <div style={{
      margin: 0, padding: 0,
      fontFamily: '-apple-system, sans-serif',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center', // Corrigido: 'center' entre aspas
      textAlign: 'center'
    }}>
      <div style={{ padding: '20px', maxWidth: '500px', width: '100%' }}>
        <img 
          src="https://driftwheels.app/assets/logo.png" 
          alt="Logo" 
          style={{ width: '120px', height: '120px', borderRadius: '20px', border: '3px solid #FCA311', marginBottom: '20px' }} 
        />
        <h1>Abrindo o DriftWheels...</h1>
        <p style={{ color: '#aaa' }}>Você está sendo redirecionado.</p>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '10px', padding: '20px', margin: '20px 0', border: '1px solid #333' }}>
          <div style={{
            width: '40px', height: '40px',
            border: '4px solid rgba(252, 163, 17, 0.2)',
            borderTop: '4px solid #FCA311',
            borderRadius: '50%',
            margin: '0 auto 15px',
          }}></div>
          <p>Tentando abrir o app...</p>
        </div>

        <a href={fallbackUrl} style={{
          display: 'inline-block', padding: '15px 30px', background: '#FCA311', color: '#000',
          textDecoration: 'none', borderRadius: '10px', fontWeight: 'bold', margin: '10px', minWidth: '200px'
        }}>
          Abrir no Navegador
        </a>

        {/* Script de redirecionamento injetado no cliente */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const APP_URL = "${appScheme}";
            const WEB_URL = "${fallbackUrl}";
            window.location.href = APP_URL;
            setTimeout(() => {
              window.location.href = WEB_URL;
            }, 3000);
          })();
        `}} />
      </div>
    </div>
  );
}