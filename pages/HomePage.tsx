import React from 'react';
import { TOOLS } from '../constants';
import ToolCard from '../components/ToolCard';
import PageWrapper from '../components/PageWrapper';

const HomePage: React.FC = () => {
  return (
    <PageWrapper
      title="FreeonTools — Ferramentas Online Gratuitas e Poderosas"
      description="Utilidades digitais rápidas, seguras e gratuitas. SEO, Marketing, Imagens, Design, Finanças e muito mais diretamente no navegador."
      canonicalUrl="https://freeontools.com.br/"
      ogImage="https://freeontools.com.br/og-home.png"
    >
      {/* Ferramentas Ativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-10">
        {Object.values(TOOLS).map((tool) => (
          <ToolCard key={tool.path} tool={tool} />
        ))}
      </div>

      {/* Categorias e Conteúdo */}
      <section className="space-y-16 py-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">🛠️ Principais Categorias de Ferramentas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-accent-blue-2 mb-3">📈 SEO e Marketing Digital</h3>
              <p className="text-gray-400 text-sm">
                Otimize sua presença online. Criação de Meta Tags, Sitemap, Tags Open Graph e Twitter Cards.
                Construção de UTM Links e Análise de Palavras-Chave.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-accent-blue-2 mb-3">✍️ Texto e Conteúdo</h3>
              <p className="text-gray-400 text-sm">
                Contadores de Palavras, Geradores de Lorem Ipsum, Parafrasear e Converter Texto em Áudio.
                Melhore a fluidez de seus textos em segundos.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-accent-blue-2 mb-3">🎨 Imagem & Design</h3>
              <p className="text-gray-400 text-sm">
                Redimensionador, Compressor, Conversores de Formato, Extração de Paleta de Cores e Geradores de Favicon.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-accent-blue-2 mb-3">💼 Financeiras & Cálculo</h3>
              <p className="text-gray-400 text-sm">
                Conversores de Moeda, Calculadoras de Juros, Descontos, Percentual, IMC e Planejadores de Orçamento.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-accent-blue-2 mb-3">🎉 Entretenimento & Diversão</h3>
              <p className="text-gray-400 text-sm">
                Geradores de Piadas, Citações e Nomes. Produtividade com um toque de leveza.
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-accent-blue-2 mb-3">👨‍💻 Para Desenvolvedores</h3>
              <p className="text-gray-400 text-sm">
                Formatadores e Minificadores de Código (JSON, HTML, CSS), Encoders/Decoders e Testadores de API.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center border-t border-white/10 pt-16">
          <div>
            <h4 className="text-accent-blue-2 font-bold mb-2">✔️ Totalmente Gratuito</h4>
            <p className="text-gray-400 text-sm">Sem taxas ou limitações ocultas.</p>
          </div>
          <div>
            <h4 className="text-accent-blue-2 font-bold mb-2">✔️ Sem Instalação</h4>
            <p className="text-gray-400 text-sm">Funciona direto no navegador.</p>
          </div>
          <div>
            <h4 className="text-accent-blue-2 font-bold mb-2">✔️ Sem Registro</h4>
            <p className="text-gray-400 text-sm">Use agora, sem contas ou e-mails.</p>
          </div>
          <div>
            <h4 className="text-accent-blue-2 font-bold mb-2">✔️ Versátil</h4>
            <p className="text-gray-400 text-sm">Dezenas de ferramentas úteis.</p>
          </div>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "FreeonTools",
          "url": "https://www.freeontools.com.br/",
          "description":
            "Portal completo de ferramentas online gratuitas: SEO, Imagem, Texto, Finanças e Programação.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.freeontools.com.br/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </PageWrapper>
  );
};

export default HomePage;
