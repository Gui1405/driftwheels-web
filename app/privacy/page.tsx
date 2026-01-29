import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade - DriftWheels",
  description: "Como o DriftWheels coleta e protege seus dados.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-8 mb-8">
          <Link href="/" className="text-[#FFD700] text-sm font-bold tracking-widest uppercase mb-4 block hover:underline">
            ← Voltar para o início
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
            POLÍTICA DE <span className="text-[#FFD700]">PRIVACIDADE</span>
          </h1>
          <p className="mt-4 text-gray-500">Última atualização: 29 de Janeiro de 2026</p>
        </div>

        {/* Conteúdo */}
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            A sua privacidade é prioridade para o <strong>DriftWheels</strong>. Esta Política de Privacidade descreve como coletamos, usamos, processamos e protegemos suas informações pessoais e dados de telemetria ao utilizar nosso aplicativo móvel.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Informações que Coletamos</h2>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-2">1.1. Dados de Identificação</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cadastro:</strong> Nome completo, endereço de e-mail, nome de usuário (handle) e foto de perfil.</li>
              <li><strong>Autenticação:</strong> Dados de login via provedores terceiros (Google Auth ou Apple Sign-in).</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-4 mb-2">1.2. Dados de Telemetria (Core do App)</h3>
            <p>Quando você ativa a função "Iniciar Corrida" (Run), coletamos:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Localização Precisa (GPS):</strong> Latitude, longitude, altitude e velocidade.</li>
              <li><strong>Sensores de Movimento:</strong> Acelerômetro e giroscópio para calcular a Força G e ângulos de drift.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-4 mb-2">1.3. Inteligência Artificial</h3>
            <p>
                Processamos dados técnicos da sua corrida através de algoritmos de IA para o recurso "Coach". 
                <strong>Não utilizamos seus dados pessoais (nome, e-mail)</strong> para treinamento de modelos públicos de IA sem seu consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Como Usamos Seus Dados</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Funcionalidade:</strong> Gerar gráficos de telemetria, mapas de calor e cálculo de pontuação (Score).</li>
              <li><strong>Recursos Sociais:</strong> Exibir seus resultados no Feed, Rankings e permitir interação.</li>
              <li><strong>Segurança:</strong> Monitorar falhas e prevenir fraudes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Compartilhamento com Terceiros</h2>
            <p>Compartilhamos informações apenas com serviços essenciais:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Supabase:</strong> Banco de dados e autenticação.</li>
              <li><strong>RevenueCat:</strong> Gerenciamento de assinaturas.</li>
              <li><strong>Mapbox/Google Maps:</strong> Renderização visual dos mapas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Exclusão de Dados</h2>
            <p>Você pode solicitar a exclusão completa da sua conta e dados diretamente no aplicativo em: <em>Perfil &gt; Configurações &gt; Zona de Perigo &gt; Deletar Conta</em>. </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Permissões do Dispositivo</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Localização:</strong> Indispensável para o registro de telemetria.</li>
              <li><strong>Câmera/Galeria:</strong> Para perfil e compartilhamento de fotos.</li>
            </ul>
          </section>

          <div className="border-t border-gray-800 pt-8 mt-12">
            <h3 className="text-xl font-bold text-white mb-2">Contato</h3>
            <p>Dúvidas sobre seus dados? Envie um e-mail para: <span className="text-[#FFD700]">guilherme@driftwheels.com.br</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}