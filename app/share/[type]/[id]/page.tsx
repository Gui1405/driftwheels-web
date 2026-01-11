import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURAÇÕES ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Tenta usar a Service Role (para pular RLS), se não tiver, usa a Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// URL Base do Storage (Geralmente é: URL_DO_PROJETO + /storage/v1/object/public)
const SUPABASE_STORAGE_URL = `${supabaseUrl}/storage/v1/object/public`;

interface Props {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

// 1. GERAR METADADOS (Onde a mágica da foto acontece)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Imagem padrão (caso o post não tenha foto)
  let imageUrl = "https://driftwheels.app/assets/logo.png"; 
  let title = "DriftWheels";
  let description = "Comunidade de Drift e Performance";

  try {
    // === POST ===
    if (type === "post") {
      const { data: post } = await supabase
        .from("posts")
        .select("caption, image_url, profiles(username)")
        .eq("id", id)
        .single();
      
      if (post) {
        // Pega o nome do usuário (trata array ou objeto)
        const profile: any = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
        title = `Post de ${profile?.username || "Piloto"}`;
        
        // Define a descrição
        description = post.caption 
            ? (post.caption.length > 100 ? post.caption.substring(0, 97) + "..." : post.caption)
            : "Confira essa foto no app!";

        // LÓGICA DA FOTO DO POST
        if (post.image_url) {
            if (post.image_url.startsWith('http')) {
                imageUrl = post.image_url;
            } else {
                // Bucket 'posts'
                imageUrl = `${SUPABASE_STORAGE_URL}/posts/${post.image_url}`;
            }
        }
      }
    } 
    // === PERFIL ===
    else if (type === "profile") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, car_model, avatar_url")
        .eq("id", id)
        .single();
      
      if (profile) {
        title = `${profile.username} no DriftWheels`;
        description = profile.car_model ? `Piloto de ${profile.car_model}` : description;
        
        if (profile.avatar_url) {
             if (profile.avatar_url.startsWith('http')) {
                imageUrl = profile.avatar_url;
            } else {
                // Bucket 'avatars'
                imageUrl = `${SUPABASE_STORAGE_URL}/avatars/${profile.avatar_url}`;
            }
        }
      }
    }
    // === SESSÃO (PARTY) ===
    else if (type === "party") {
        const { data: party } = await supabase
            .from("parties")
            .select("name, date_time, tracks(name, image_url)")
            .eq("id", id)
            .single();

        if (party) {
            const date = new Date(party.date_time).toLocaleDateString('pt-BR');
            
            // Tratamento de segurança para o relacionamento tracks (pode vir array ou objeto)
            const trackData: any = party.tracks;
            const trackName = Array.isArray(trackData) ? trackData[0]?.name : trackData?.name;
            const trackImage = Array.isArray(trackData) ? trackData[0]?.image_url : trackData?.image_url;

            title = `Sessão: ${party.name}`;
            description = `Venha correr em ${trackName || "uma pista"}! Dia ${date}.`;
            
            // Usa a foto da pista se tiver
            if (trackImage) {
                 if (trackImage.startsWith('http')) {
                    imageUrl = trackImage;
                } else {
                    // Bucket 'tracks'
                    imageUrl = `${SUPABASE_STORAGE_URL}/tracks/${trackImage}`;
                }
            }
        }
    }

  } catch (e) {
    console.error("Erro metadados:", e);
  }

  // Retorno final para o WhatsApp ler
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://driftwheels.app/share/${type}/${id}`,
      siteName: 'DriftWheels',
      images: [
        {
          url: imageUrl, // URL absoluta gerada acima
          width: 800,
          height: 800,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary', // 'summary' para miniatura pequena, 'summary_large_image' para grande
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

// 2. PÁGINA VISUAL (Redirecionamento)
export default async function SharePage({ params }: Props) {
  const { type, id } = await params;
  const appScheme = `driftwheels://${type}/${id}`;
  const fallbackUrl = "https://driftwheels.app";

  return (
    <div style={{
      margin: 0, padding: 0,
      fontFamily: '-apple-system, sans-serif',
      background: '#000', color: '#fff',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', 
      justifyContent: 'center', alignItems: 'center', textAlign: 'center'
    }}>
      <div style={{ padding: '20px', maxWidth: '400px', width: '100%' }}>
        
        {/* Loader CSS */}
        <div style={{
            width: '40px', height: '40px',
            border: '4px solid #333', borderTop: '4px solid #FCA311',
            borderRadius: '50%', margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>

        <h1 style={{ color: '#FCA311', fontSize: '20px', marginBottom: '10px' }}>DriftWheels</h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>Redirecionando...</p>
        
        <a href={appScheme} style={{
          display: 'block', width: '100%', padding: '15px 0', 
          background: '#FCA311', color: '#000', textDecoration: 'none', 
          borderRadius: '12px', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase'
        }}>
          Abrir no App
        </a>

        <a href={fallbackUrl} style={{ color: '#666', fontSize: '13px', textDecoration: 'underline' }}>
          Ir para o site
        </a>

        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var appUrl = "${appScheme}";
            var webUrl = "${fallbackUrl}";
            
            // 1. Tenta App imediatamente
            window.location.replace(appUrl);

            // 2. Timer de fallback (1s)
            // Se o navegador não for minimizado (o app não abriu), redireciona pro site
            setTimeout(function() {
              if (!document.hidden) {
                 window.location.replace(webUrl);
              }
            }, 1000);
          })();
        `}} />
      </div>
    </div>
  );
}