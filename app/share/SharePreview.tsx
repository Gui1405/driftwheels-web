'use client';

import React, { useEffect, useState } from 'react';

interface SharePreviewProps {
  data: any;
  type: string;
  appScheme: string;
  fallbackUrl: string;
}

export default function SharePreview({ data, type, appScheme, fallbackUrl }: SharePreviewProps) {
  const [showModal, setShowModal] = useState(false);

  // Tenta abrir o App assim que a página carrega (Deep Link)
  useEffect(() => {
    // Tenta abrir o app imediatamente
    window.location.href = appScheme;
    
    // NOTA: Não fazemos redirect automático para o site aqui.
    // Se o app não abrir, o usuário permanece nesta tela vendo o "Preview".
  }, [appScheme]);

  const handleInteraction = () => {
    setShowModal(true);
  };

  // Ícones SVG (Para não depender de bibliotecas)
  const IconHeart = () => <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
  const IconMessage = () => <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>;
  const IconShare = () => <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;
  const IconDrift = () => <svg width="20" height="20" fill="#FF4500" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.95 1.48-1.08 6.6 6.37-3.18L12 22l-8.24-6.1 6.37 3.18-1.08-6.6L12 11z"/></svg>;

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: '#000', color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '80px'
    }}>
      
      {/* HEADER TIPO APP */}
      <div style={{
        width: '100%', maxWidth: '500px', height: '50px',
        borderBottom: '1px solid #222', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        position: 'sticky', top: 0, backgroundColor: '#000', zIndex: 10
      }}>
        {/* ANTES ERA ASSIM: */}
        {/* <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#FCA311', letterSpacing: '1px' }}>DRIFTWHEELS</span> */}
        
        {/* AGORA FICA ASSIM (Imagem): */}
        <img 
          src="/assets/logo_esticado.png" 
          alt="DriftWheels" 
          style={{ 
            height: '28px',       // Altura fixa para não estourar o header
            maxWidth: '150px',    // Largura máxima de segurança
            objectFit: 'contain'  // Garante que a logo não distorça
          }} 
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

          {/* Ações */}
          <div style={{ padding: '12px 15px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
              <div onClick={handleInteraction} style={{ cursor: 'pointer' }}><IconHeart /></div>
              <div onClick={handleInteraction} style={{ cursor: 'pointer' }}><IconMessage /></div>
              <div onClick={handleInteraction} style={{ cursor: 'pointer' }}><IconShare /></div>
            </div>
            
            {/* Legenda */}
            <div>
              <span style={{ fontWeight: 'bold', marginRight: '6px', fontSize: '14px' }}>{data.username}</span>
              <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{data.caption}</span>
            </div>
            <div 
                onClick={handleInteraction}
                style={{ color: '#666', fontSize: '12px', marginTop: '8px', cursor: 'pointer' }}
            >
                Ver todos os comentários
            </div>
          </div>
        </div>
      )}

      {/* --- VISUALIZAÇÃO DE PERFIL --- */}
      {type === 'profile' && (
        <div style={{ width: '100%', maxWidth: '500px', padding: '30px 20px', textAlign: 'center' }}>
            <img 
              src={data.image || "https://driftwheels.app/assets/logo.png"} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FF4500' }} 
            />
            <h1 style={{ marginTop: '15px', fontSize: '22px', fontWeight: 'bold' }}>{data.username}</h1>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>{data.car}</p>
            {data.bio && <p style={{ color: '#ccc', fontSize: '13px', marginTop: '10px', fontStyle:'italic' }}>"{data.bio}"</p>}
            
            <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '30px', borderTop:'1px solid #222', borderBottom:'1px solid #222', padding:'15px 0' }}>
                <div style={{textAlign: 'center'}}><div style={{fontWeight:'bold', fontSize:'16px'}}>--</div><div style={{fontSize:'12px', color:'#666'}}>Posts</div></div>
                <div style={{textAlign: 'center'}}><div style={{fontWeight:'bold', fontSize:'16px'}}>--</div><div style={{fontSize:'12px', color:'#666'}}>Seguidores</div></div>
                <div style={{textAlign: 'center'}}><div style={{fontWeight:'bold', fontSize:'16px'}}>--</div><div style={{fontSize:'12px', color:'#666'}}>Rank</div></div>
            </div>
            
            <button 
                onClick={handleInteraction}
                style={{ marginTop: '30px', width: '100%', padding: '14px', backgroundColor: '#FF4500', color:'#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize:'14px' }}
            >
                Ver Perfil Completo no App
            </button>
        </div>
      )}

      {/* --- BANNER FLUTUANTE "ABRIR NO APP" --- */}
      {!showModal && (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            backgroundColor: '#1a1a1a', borderTop: '1px solid #333',
            padding: '10px 20px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', zIndex: 50, maxWidth: '500px', margin: '0 auto'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src="/assets/logo.png" 
                    alt="Icon"
                    style={{ 
                        width: '40px', height: '40px', 
                        borderRadius: '8px', 
                        objectFit: 'cover', // ou 'contain' se quiser ver a logo inteira sem cortar
                        border: '1px solid #333',
                        backgroundColor: '#000' 
                    }} 
                />
                <div style={{ marginLeft: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color:'#fff' }}>DriftWheels</div>
                    <div style={{ fontSize: '11px', color: '#FF4500' }}>Comunidade de Drift</div>
                </div>
            </div>
            <button 
                onClick={() => window.location.href = appScheme}
                style={{ backgroundColor: '#FF4500', color: '#000', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}
            >
                ABRIR
            </button>
        </div>
      )}

      {/* --- MODAL DE INTERAÇÃO --- */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            backgroundColor: '#1a1a1a', width: '100%', maxWidth: '320px',
            borderRadius: '16px', padding: '30px 20px', textAlign: 'center',
            border: '1px solid #333', boxShadow: '0 10px 40px rgba(0,0,0,0.7)'
          }} onClick={e => e.stopPropagation()}>
            
            <img 
                src="/assets/logo.png"
                alt="Logo"
                style={{ 
                    width: '60px', height: '60px', 
                    borderRadius: '15px', 
                    objectFit: 'cover', // ou 'contain'
                    backgroundColor:'#000', 
                    border:'1px solid #FCA311', 
                    margin:'0 auto 20px', 
                    display:'block' 
                }} 
            />
            
            <h2 style={{ fontSize: '20px', marginBottom: '10px', fontWeight:'bold' }}>Baixe o App</h2>
            <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '30px', lineHeight: '1.5' }}>
              Para interagir com {data.username}, você precisa do aplicativo DriftWheels.
            </p>

            <a href={fallbackUrl} style={{
              display: 'block', width: '100%', padding: '14px',
              backgroundColor: '#FF4500', color: '#000',
              textDecoration: 'none', fontWeight: 'bold', borderRadius: '10px',
              marginBottom: '15px', fontSize:'14px'
            }}>
              Baixar App / Acessar Site
            </a>

            <button 
              onClick={() => setShowModal(false)}
              style={{ background: 'transparent', border: 'none', color: '#666', fontSize: '13px', cursor: 'pointer' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}