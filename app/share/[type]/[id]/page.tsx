import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
// IMPORTANTE: Certifique-se de que essas variáveis estão no .env.local ou na Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

interface Props {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

// 1. GERAR METADADOS DINÂMICOS (Isso cria a miniatura)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let title = "DriftWheels";
  let description = "Comunidade de Drift e Performance";
  // Use uma imagem padrão quadrada para ficar bom no WhatsApp
  let imageUrl = "https://driftwheels.app/assets/logo.png"; 

  try {
    // --- LÓGICA DE POST ---
    if (type === "post") {
      const { data: post } = await supabase
        .from("posts")
        .select("caption, image_url, profiles(username)")
        .eq("id", id)
        .single();
      
      if (post) {
        const profile: any = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
        title = `Post de ${profile?.username || "Piloto"}`;
        // Corta a descrição se for muito longa
        description = post.caption 
            ? (post.caption.length > 100 ? post.caption.substring(0, 97) + "..." : post.caption)
            : description;
        if (post.image_url) imageUrl = post.image_url;
      }
    } 
    // --- LÓGICA DE PERFIL ---
    else if (type === "profile") {
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
    // --- LÓGICA DE SESSÃO (PARTY) ---
    // --- LÓGICA DE SESSÃO (PARTY) ---
    else if (type === "party") {
        const { data: party } = await supabase
            .from("parties")
            .select("name, date_time, tracks(name)")
            .eq("id", id)
            .single();

        if (party) {
            const date = new Date(party.date_time).toLocaleDateString('pt-BR');
            
            // CORREÇÃO AQUI:
            // Verifica se 'tracks' é uma lista (array) e pega o primeiro, ou usa direto se for objeto
            const trackData: any = party.tracks;
            const trackName = Array.isArray(trackData) ? trackData[0]?.name : trackData?.name;

            title = `Sessão: ${party.name}`;
            description = `Venha correr em ${trackName || "uma pista"}! Dia ${date}.`;
        }
    }

  } catch (e) {
    console.error("Erro ao buscar metadados:", e);
  }

  return {
    title: title,
    description: description,
    // Configuração Open Graph (Facebook, LinkedIn, etc)
    openGraph: {
      title: title,
      description: description,
      url: `https://driftwheels.app/share/${type}/${id}`,
      siteName: 'DriftWheels',
      images: [
        {
          url: imageUrl,
          width: 800,  // Dimensões recomendadas
          height: 800, // Quadrado funciona melhor para o resumo
          alt: title,
        },
      ],
      type: 'website',
    },
    // Configuração Twitter (Essencial para WhatsApp exibir a imagem pequena ao lado)
    twitter: {
      card: 'summary', // 'summary' = imagem pequena lado esquerdo. 'summary_large_image' = imagem grande.
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

// 2. COMPONENTE DA PÁGINA (Redirecionamento Visual)
export default async function SharePage({ params }: Props) {
  const { type, id } = await params;
  
  // Links
  const appScheme = `driftwheels://${type}/${id}`;
  const fallbackUrl = "https://driftwheels.app";

  return (
    <div style={{
      margin: 0, padding: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      background: '#000', // Fundo preto sólido carrega mais rápido visualmente
      color: '#fff',
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <div style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
        
        {/* Loader Animado CSS */}
        <div style={{
            width: '40px', height: '40px',
            border: '4px solid #333',
            borderTop: '4px solid #FCA311',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

        <h1 style={{ color: '#FCA311', fontSize: '20px', marginBottom: '10px' }}>DriftWheels</h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>Redirecionando...</p>
        
        <a href={appScheme} style={{
          display: 'block', width: '100%', padding: '15px 0', 
          background: '#FCA311', color: '#000',
          textDecoration: 'none', borderRadius: '12px', fontWeight: 'bold', 
          marginBottom: '15px', textTransform: 'uppercase'
        }}>
          Abrir no App
        </a>

        <a href={fallbackUrl} style={{
          color: '#666', textDecoration: 'underline', fontSize: '13px'
        }}>
          Ir para o site
        </a>

        {/* SCRIPT DE REDIRECIONAMENTO INTELIGENTE 
            Tenta abrir o app. Se a página continuar visível após 1.5s, vai pro site.
        */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var appUrl = "${appScheme}";
            var webUrl = "${fallbackUrl}";
            
            // 1. Tenta abrir o App imediatamente
            window.location.replace(appUrl);

            // 2. Timer de fallback
            setTimeout(function() {
              // Se o documento ainda estiver visível (significa que o app não abriu por cima)
              if (!document.hidden) {
                 window.location.replace(webUrl);
              }
            }, 1500);
          })();
        `}} />
      </div>
    </div>
  );
}