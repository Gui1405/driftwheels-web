import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import SharePreview from '../../SharePreview';

// --- CONFIGURAÇÕES ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_STORAGE_URL = `${supabaseUrl}/storage/v1/object/public`;

interface Props {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

// Helper: Garante que a URL da imagem seja absoluta (Necessário para WhatsApp)
const getImageUrl = (path: string | null, bucket: string) => {
    if (!path) return "https://driftwheels.app/assets/logo.png";
    if (path.startsWith('http')) return path;
    return `${SUPABASE_STORAGE_URL}/${bucket}/${path}`;
};

// =====================================================================
// 1. GERAR METADADOS (WHATSAPP / TWITTER / FACEBOOK)
// =====================================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let imageUrl = "https://driftwheels.app/assets/logo.png"; 
  let title = "DriftWheels";
  let description = "Comunidade de Drift e Performance";

  try {
    if (type === "post") {
      const { data: post } = await supabase.from("posts").select("caption, image_url, profiles(username)").eq("id", id).single();
      if (post) {
        const profile: any = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
        title = `Post de ${profile?.username || "Piloto"}`;
        description = post.caption ? (post.caption.length > 100 ? post.caption.substring(0, 97) + "..." : post.caption) : description;
        imageUrl = getImageUrl(post.image_url, 'posts');
      }
    } else if (type === "profile") {
      const { data: profile } = await supabase.from("profiles").select("username, car_model, avatar_url").eq("id", id).single();
      if (profile) {
        title = `${profile.username} no DriftWheels`;
        description = profile.car_model ? `Piloto de ${profile.car_model}` : description;
        imageUrl = getImageUrl(profile.avatar_url, 'avatars');
      }
    } else if (type === "party") {
        const { data: party } = await supabase.from("parties").select("name, tracks(image_url)").eq("id", id).single();
        if (party) {
            title = `Sessão: ${party.name}`;
            const trackData: any = party.tracks;
            const img = Array.isArray(trackData) ? trackData[0]?.image_url : trackData?.image_url;
            if(img) imageUrl = getImageUrl(img, 'tracks');
        }
    }
  } catch (e) { console.error(e); }

  return {
    title, description,
    openGraph: { title, description, images: [{ url: imageUrl, width: 800, height: 800 }], type: 'website' },
    twitter: { card: 'summary_large_image', title, description, images: [imageUrl] },
  };
}

// =====================================================================
// 2. RENDERIZAÇÃO DA PÁGINA (VISUAL + DADOS)
// =====================================================================
export default async function SharePage({ params }: Props) {
  const { type, id } = await params;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const appScheme = `driftwheels://${type}/${id}`;
  const fallbackUrl = "https://driftwheels.app";

  // Objeto de dados unificado para a View
  let viewData: any = { 
      username: 'DriftWheels', 
      image: 'https://driftwheels.app/assets/logo.png', 
      caption: 'Conteúdo não encontrado.',
      avatar: 'https://driftwheels.app/assets/logo.png',
      car: ''
  };

  try {
    // --- TIPO: POST ---
    if (type === "post") {
        const { data: post } = await supabase
            .from("posts")
            .select("caption, image_url, profiles(username, avatar_url, car_model)")
            .eq("id", id)
            .single();
        
        if (post) {
            const profile: any = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
            viewData = {
                username: profile?.username || "Piloto",
                avatar: getImageUrl(profile?.avatar_url, 'avatars'),
                car: profile?.car_model,
                image: getImageUrl(post.image_url, 'posts'),
                caption: post.caption
            };
        }
    } 
    // --- TIPO: PROFILE (PERFIL) ---
    else if (type === "profile") {
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single();
        if (profile) {
            // Executa todas as queries em paralelo para carregar rápido
            const [postsCountRes, followersCountRes, bestRunRes, recentPostsRes] = await Promise.all([
                // 1. Contagem de Posts
                supabase.from('posts').select('*', { count: 'exact', head: true }).eq('user_id', id),
                // 2. Contagem de Seguidores
                supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', id),
                // 3. Melhor Pontuação (Recorde)
                supabase.from('runs').select('total_points').eq('user_id', id).order('total_points', { ascending: false }).limit(1).single(),
                // 4. Últimos 9 posts (para preencher o grid 3x3)
                supabase.from('posts').select('id, image_url').eq('user_id', id).not('image_url', 'is', null).order('created_at', { ascending: false }).limit(9)
            ]);

            viewData = {
                username: profile.username,
                image: getImageUrl(profile.avatar_url, 'avatars'), // No perfil, a imagem principal é o avatar
                car: profile.car_model,
                bio: profile.bio,
                // Passa os stats para o componente visual
                stats: {
                    posts: postsCountRes.count || 0,
                    followers: followersCountRes.count || 0,
                    bestScore: bestRunRes.data?.total_points || 0
                },
                // Passa as fotos para a galeria
                lastPosts: (recentPostsRes.data || []).map(p => ({
                    id: p.id,
                    imageUrl: getImageUrl(p.image_url, 'posts')
                }))
            };
        }
    }
    // --- TIPO: PARTY (SESSÃO) ---
    else if (type === "party") {
        const { data: party } = await supabase.from("parties").select("name, description, tracks(image_url, name)").eq("id", id).single();
        if (party) {
            const trackData: any = party.tracks;
            const img = Array.isArray(trackData) ? trackData[0]?.image_url : trackData?.image_url;
            
            viewData = {
                username: `Sessão: ${party.name}`,
                car: trackData?.name || "Pista",
                image: getImageUrl(img, 'tracks'),
                caption: party.description || "Venha participar desta sessão no DriftWheels!"
            };
        }
    }

  } catch (e) {
      console.log("Erro view data:", e);
  }

  // Renderiza o componente Cliente (SharePreview) passando os dados já buscados
  return (
    <SharePreview 
        data={viewData} 
        type={type} 
        appScheme={appScheme} 
        fallbackUrl={fallbackUrl} 
    />
  );
}