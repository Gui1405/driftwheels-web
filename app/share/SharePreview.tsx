'use client';

import React, { useEffect, useState } from 'react';

// Interface compatível com os dados que buscamos no Supabase
interface SharePreviewProps {
  data: {
    username: string;
    image: string;      // Avatar principal
    caption?: string;
    car?: string;
    bio?: string;
    avatar?: string;    // Avatar pequeno para posts
    
    // Dados estatísticos vindos do page.tsx
    stats?: { 
      posts: number; 
      followers: number; 
      bestScore: number; 
    };
    
    // Lista de posts para a galeria
    lastPosts?: { id: string; imageUrl: string }[];
  };
  type: string;
  appScheme: string;
  fallbackUrl: string;
}

export default function SharePreview({ data, type, appScheme, fallbackUrl }: SharePreviewProps) {
  const [showModal, setShowModal] = useState(false);

  // Tenta abrir o App automaticamente (Deep Link)
  useEffect(() => {
    const timer = setTimeout(() => {
        window.location.href = appScheme;
    }, 100);
    return () => clearTimeout(timer);
  }, [appScheme]);

  const handleInteraction = () => {
    setShowModal(true);
  };

  // Ícones SVG
  const IconHeart = () => <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
  const IconMessage = () => <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;
  const IconShare = () => <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;

  // Cor principal (Laranja DriftWheels)
  const ACCENT_COLOR = '#FF4500';

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#000', color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '80px'
    }}>
      
      {/* HEADER FIXO */}
      <div style={{
        width: '100%', maxWidth: '500px', height: '60px',
        borderBottom: '1px solid #222', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        position: 'sticky', top: 0, backgroundColor: '#000', zIndex: 10
      }}>
        <img 
          src="/assets/logo_esticado.png" 
          alt="DriftWheels" 
          style={{ height: '28px', maxWidth: '150px', objectFit: 'contain' }} 
        />
      </div>

      {/* --- VISUALIZAÇÃO DE POST --- */}
      {type === 'post' && (
        <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#000' }}>
          {/* Cabeçalho do Post */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 15px' }}>
            <img 
              src={data.avatar || "https://driftwheels.app/assets/logo.png"} 
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #333' }} 
            />
            <div style={{ marginLeft: '10px', display:'flex', flexDirection:'column' }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{data.username}</span>
                {data.car && <span style={{ fontSize: '11px', color: '#888' }}>{data.car}</span>}
            </div>
          </div>

          {/* Imagem do Post */}
          <div 
            onClick={handleInteraction}
            style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#111', cursor: 'pointer', position: 'relative' }}
          >
            <img src={data.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Ações e Legenda */}
          <div style={{ padding: '12px 15px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div onClick={handleInteraction} style={{ cursor: 'pointer' }}><IconHeart /></div>
              <div onClick={handleInteraction} style={{ cursor: 'pointer' }}><IconMessage /></div>
              <div onClick={handleInteraction} style={{ cursor: 'pointer' }}><IconShare /></div>
            </div>
            <div>
              <span style={{ fontWeight: 'bold', marginRight: '6px', fontSize: '14px' }}>{data.username}</span>
              <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{data.caption}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- VISUALIZAÇÃO DE PERFIL (Estilo OtherUserProfileModal) --- */}
      {type === 'profile' && (
        <div style={{ width: '100%', maxWidth: '500px', padding: '30px 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Foto de Perfil Centralizada */}
            <div style={{ 
                width: '110px', height: '110px', borderRadius: '50%', 
                padding: '3px', border: `2px solid ${ACCENT_COLOR}`,
                marginBottom: '15px' 
            }}>
                <img 
                  src={data.image || "https://driftwheels.app/assets/logo.png"} 
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', backgroundColor: '#222' }} 
                />
            </div>

            {/* Informações */}
            <h1 style={{ fontSize: '24px', fontWeight: '800', margin: '0 0 5px 0' }}>{data.username}</h1>
            <p style={{ color: '#888', fontSize: '14px', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                {data.car || "Piloto"}
            </p>
            {data.bio && <p style={{ color: '#ccc', fontSize: '13px', fontStyle:'italic', maxWidth:'80%', textAlign:'center', marginBottom: '20px' }}>"{data.bio}"</p>}
            
            {/* Barra de Stats (Conectada com dados reais) */}
            <div style={{ 
                width: '100%', display: 'flex', justifyContent: 'center', gap: '0', 
                borderTop:'1px solid #222', borderBottom:'1px solid #222', 
                padding:'15px 0', marginBottom: '25px', backgroundColor: '#0a0a0a', borderRadius: '8px'
            }}>
                <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #222' }}>
                    <div style={{ fontWeight:'bold', fontSize:'18px', color: '#FFF' }}>{data.stats?.posts ?? '-'}</div>
                    <div style={{ fontSize:'10px', color:'#666', textTransform:'uppercase', marginTop:'4px' }}>Posts</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #222' }}>
                    <div style={{ fontWeight:'bold', fontSize:'18px', color: ACCENT_COLOR }}>{data.stats?.bestScore ?? '-'}</div>
                    <div style={{ fontSize:'10px', color:'#666', textTransform:'uppercase', marginTop:'4px' }}>Recorde</div>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontWeight:'bold', fontSize:'18px', color: '#FFF' }}>{data.stats?.followers ?? '-'}</div>
                    <div style={{ fontSize:'10px', color:'#666', textTransform:'uppercase', marginTop:'4px' }}>Seguidores</div>
                </div>
            </div>
            
            {/* Botão de Ação */}
            <button 
                onClick={handleInteraction}
                style={{ 
                    width: '100%', padding: '14px', backgroundColor: ACCENT_COLOR, 
                    color:'#000', border: 'none', borderRadius: '10px', 
                    fontWeight: '900', cursor: 'pointer', fontSize:'14px', 
                    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px'
                }}
            >
                Abrir no App
            </button>

            {/* Grid de Fotos (Estilo 3 colunas igual ao App) */}
            {data.lastPosts && data.lastPosts.length > 0 && (
                <div style={{ width: '100%' }}>
                    <div style={{ fontSize: '12px', color: ACCENT_COLOR, fontWeight: 'bold', marginBottom: '10px', paddingLeft: '5px', letterSpacing:'1px' }}>
                        GALERIA
                    </div>
                    
                    {/* CSS Grid para 3 colunas perfeitas */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', // 3 colunas iguais
                        gap: '2px', // Espaçamento pequeno igual ao modal
                        width: '100%'
                    }}>
                        {data.lastPosts.map((post: any) => (
                             <div 
                                key={post.id} 
                                onClick={handleInteraction}
                                style={{ 
                                    aspectRatio: '1/1', // Garante que seja quadrado
                                    backgroundColor: '#111', 
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                             >
                                <img 
                                    src={post.imageUrl} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    alt="Post"
                                />
                             </div>
                        ))}
                        
                        {/* Preenche o resto do grid se tiver menos de 3 fotos para manter alinhamento (opcional) */}
                        {[...Array(Math.max(0, 3 - data.lastPosts.length))].map((_, i) => (
                            <div key={`empty-${i}`} style={{ aspectRatio: '1/1', backgroundColor: '#111' }} />
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}

      {/* --- BANNER FLUTUANTE --- */}
      {!showModal && (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            backgroundColor: '#111', borderTop: '1px solid #333',
            padding: '12px 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', zIndex: 50, maxWidth: '500px', margin: '0 auto'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src="/assets/logo.png" 
                    alt="Icon"
                    style={{ width: '38px', height: '38px', borderRadius: '8px', border: '1px solid #333' }} 
                />
                <div style={{ marginLeft: '12px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color:'#fff' }}>DriftWheels</div>
                    <div style={{ fontSize: '11px', color: ACCENT_COLOR }}>Comunidade de Drift</div>
                </div>
            </div>
            <button 
                onClick={() => window.location.href = appScheme}
                style={{ backgroundColor: ACCENT_COLOR, color: '#000', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
            >
                ABRIR
            </button>
        </div>
      )}

      {/* --- MODAL DE INTERAÇÃO --- */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            backgroundColor: '#161616', width: '100%', maxWidth: '320px',
            borderRadius: '20px', padding: '30px 20px', textAlign: 'center',
            border: '1px solid #333'
          }} onClick={e => e.stopPropagation()}>
            
            <img 
                src="/assets/logo.png"
                alt="Logo"
                style={{ width: '60px', height: '60px', borderRadius: '15px', backgroundColor:'#000', border:`1px solid ${ACCENT_COLOR}`, margin:'0 auto 20px', display:'block' }} 
            />
            
            <h2 style={{ fontSize: '18px', marginBottom: '10px', fontWeight:'bold', color: 'white' }}>Baixe o App</h2>
            <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '30px', lineHeight: '1.5' }}>
              Para ver os detalhes completos de {data.username}, acesse pelo app.
            </p>

            <a href={fallbackUrl} style={{
              display: 'block', width: '100%', padding: '14px',
              backgroundColor: ACCENT_COLOR, color: '#000',
              textDecoration: 'none', fontWeight: 'bold', borderRadius: '10px',
              marginBottom: '15px', fontSize:'14px'
            }}>
              Baixar agora
            </a>

            <button 
              onClick={() => setShowModal(false)}
              style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer', padding: '10px' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}