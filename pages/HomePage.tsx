import React from 'react';
import { TOOLS } from '../constants';
import ToolCard from '../components/ToolCard';
import PageWrapper from '../components/PageWrapper';

const HomePage: React.FC = () => {
  return (
    <PageWrapper
      title="Ferramentas Online Gratuitas:  Rápidas, Seguras e Sem Limites"
      description="Coleção de ferramentas online gratuitas em português. Edição de fotos, utilidades para texto, compressão, conversores e muito mais. Rápido, seguro e 100% gratuito."
      canonicalUrl="https://free-on-tools.vercel.app/"
      ogImage="https://free-on-tools.vercel.app/og-home.png"
    >
      {/* HERO — SEO + Conversão */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold text-accent-blue-2">
          Ferramentas Online Gratuitas Para Suas Tarefas do Dia a Dia
        </h1>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Use utilidades rápidas, seguras e totalmente gratuitas para editar imagens, converter arquivos,
          gerar textos, corrigir conteúdo e muito mais — tudo direto do navegador.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(TOOLS).map((tool) => (
          <ToolCard key={tool.path} tool={tool} />
        ))}
      </div>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Por que usar nossas ferramentas online?
        </h2>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-accent-blue-2 mb-2">100% Gratuito</h3>
            <p className="text-gray-300">Sem limites e sem cadastro. Use quantas vezes quiser.</p>
          </div>

          <div className="p-4">
            <h3 className="text-xl font-semibold text-accent-blue-2 mb-2">Seguro e Privado</h3>
            <p className="text-gray-300">Tudo é processado no seu navegador—nenhum arquivo vai para o servidor.</p>
          </div>

          <div className="p-4">
            <h3 className="text-xl font-semibold text-accent-blue-2 mb-2">Rápido e Eficiente</h3>
            <p className="text-gray-300">Resultados instantâneos sem travamentos.</p>
          </div>
        </div>
      </section>

      {/* SEO JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Ferramentas Online Gratuitas",
          "url": "https://www.seusite.com/",
          "description":
            "A maior coleção de ferramentas online gratuitas em português. Rápidas, seguras e sem limites.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.seusite.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </PageWrapper>
  );
};

export default HomePage;
