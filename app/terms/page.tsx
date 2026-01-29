import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso - DriftWheels",
  description: "Termos e Condições de uso do aplicativo DriftWheels.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-800 pb-8 mb-8">
          <Link href="/" className="text-[#FFD700] text-sm font-bold tracking-widest uppercase mb-4 block hover:underline">
            ← Voltar para o início
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
            TERMOS DE <span className="text-[#FFD700]">USO</span>
          </h1>
          <p className="mt-4 text-gray-500">Última atualização: 29 de Janeiro de 2026</p>
        </div>

        {/* Conteúdo */}
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Bem-vindo ao <strong>DriftWheels</strong>. Estes Termos de Uso regem o acesso e a utilização do nosso aplicativo. Ao baixar, instalar ou usar o DriftWheels, você concorda em cumprir estes termos. Se você não concordar, não utilize o aplicativo.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Segurança e Responsabilidade</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Uso em Pistas Fechadas:</strong> Recomendamos enfaticamente que o uso das funcionalidades de alta performance, drift e telemetria seja feito <strong>exclusivamente em ambientes controlados</strong>, como autódromos, kartódromos ou áreas privadas fechadas.</li>
              <li><strong>Leis de Trânsito:</strong> Você concorda em <strong>NÃO</strong> violar leis de trânsito locais. O DriftWheels não incentiva, tolera ou apoia rachas de rua (street racing) ou direção perigosa em vias públicas.</li>
              <li><strong>Isenção de Responsabilidade:</strong> Os desenvolvedores do DriftWheels <strong>não se responsabilizam</strong> por quaisquer acidentes, danos físicos, danos materiais, multas ou infrações legais decorrentes do uso do aplicativo. A condução do veículo é de inteira e exclusiva responsabilidade do usuário.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Inteligência Artificial (AI Coach)</h2>
            <p>O aplicativo utiliza recursos de Inteligência Artificial para analisar sua pilotagem.</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Caráter Informativo:</strong> As dicas, análises e feedbacks gerados pela IA ("Coach") têm caráter estritamente recreativo e informativo.</li>
              <li><strong>Possibilidade de Erro:</strong> A IA pode apresentar imprecisões técnicas ou "alucinações". O DriftWheels não garante a precisão técnica das instruções de pilotagem.</li>
              <li><strong>Não Substitui Profissionais:</strong> O feedback da IA não substitui a instrução de um piloto profissional ou instrutor certificado.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Conteúdo do Usuário e Conduta</h2>
            <p>Ao utilizar os recursos sociais (Feed, Comentários, Perfil):</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Você mantém os direitos sobre seu conteúdo, mas concede ao DriftWheels uma licença para exibi-lo na plataforma.</li>
              <li>É <strong>proibido</strong> publicar conteúdo ilegal, violento, pornográfico, discurso de ódio ou que promova atividades criminosas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Assinaturas e Pagamentos (Premium)</h2>
            <p>O DriftWheels oferece um plano de assinatura ("Premium") que desbloqueia recursos avançados.</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Processamento:</strong> As transações são processadas pelas lojas de aplicativos (Apple App Store e Google Play Store).</li>
              <li><strong>Renovação Automática:</strong> A assinatura é renovada automaticamente ao final de cada período, a menos que cancelada pelo usuário nas configurações da loja do dispositivo com pelo menos 24 horas de antecedência.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Propriedade Intelectual</h2>
            <p>Todo o design, código-fonte, algoritmos de detecção de curvas, marcas e logotipos do DriftWheels são propriedade exclusiva de seus desenvolvedores. É proibida a engenharia reversa, cópia ou distribuição não autorizada do aplicativo.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Lei Aplicável</h2>
            <p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>
          </section>

          <div className="border-t border-gray-800 pt-8 mt-12">
            <h3 className="text-xl font-bold text-white mb-2">Contato</h3>
            <p>Dúvidas? Envie um e-mail para: <span className="text-[#FFD700]">guilherme@driftwheels.com.br</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}