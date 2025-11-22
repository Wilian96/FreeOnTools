
import React from 'react';
import { TOOLS } from '../constants';
import ToolCard from '../components/ToolCard';
import PageWrapper from '../components/PageWrapper';

const HomePage: React.FC = () => {
  return (
    <PageWrapper
      title="Ferramentas Online Gratuitas"
      description="Uma coleção de utilitários online para simplificar suas tarefas diárias. Rápido, seguro e totalmente gratuito."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(TOOLS).map((tool) => (
          <ToolCard key={tool.path} tool={tool} />
        ))}
      </div>
       <section className="mt-16 text-center">
        {/* <!-- FreeOnTools Anúncios --> */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5406946923069545" crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-5406946923069545"
          data-ad-slot="2872095981"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

        <h2 className="text-3xl font-bold text-white mb-4">Por que usar nossas ferramentas?</h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-accent-blue-2 mb-2">100% Gratuito</h3>
            <p className="text-gray-300">Todas as ferramentas são completamente gratuitas, sem limites de uso.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-accent-blue-2 mb-2">Seguro e Privado</h3>
            <p className="text-gray-300">Seus dados são processados no seu navegador. Nenhum arquivo é enviado para nossos servidores.</p>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-accent-blue-2 mb-2">Rápido e Eficiente</h3>
            <p className="text-gray-300">Obtenha resultados instantâneos graças ao processamento do lado do cliente.</p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default HomePage;
