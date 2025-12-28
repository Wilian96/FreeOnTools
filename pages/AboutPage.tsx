
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';

const AboutPage: React.FC = () => {
  return (
    <PageWrapper
      title="Sobre o FreeonTools"
      description="Conheça a missão por trás do portal FreeonTools – Ferramentas Online Gratuitas e Poderosas."
    >
      <GlassCard className="text-gray-300 space-y-8 leading-relaxed">
        <section>
          <h2 className="text-3xl font-bold text-white mb-4">🚀 O Que é o FreeonTools</h2>
          <p>
            O FreeonTools oferece uma coleção abrangente de utilitários digitais gratuitos que facilitam desde tarefas simples até processos mais avançados. A proposta é eliminar a necessidade de programas pesados e licenciamentos caros, entregando soluções rápidas e práticas em um só lugar.
          </p>
          <p className="mt-4">
            Projetado para ajudar qualquer pessoa — de profissionais a estudantes, de desenvolvedores a criadores de conteúdo — a resolver tarefas do dia a dia sem instalar software ou criar contas. Todas as ferramentas estão disponíveis diretamente no navegador, com uso rápido, intuitivo e sem custos ocultos.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">🚀 Quem Pode Usar</h2>
          <p className="mb-4">O FreeonTools é ideal para:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-accent-blue-2 mr-2">✔️</span> Profissionais de SEO e marketing digital
            </li>
            <li className="flex items-start bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-accent-blue-2 mr-2">✔️</span> Designers, criadores de conteúdo e social media
            </li>
            <li className="flex items-start bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-accent-blue-2 mr-2">✔️</span> Desenvolvedores, programadores e estudantes de TI
            </li>
            <li className="flex items-start bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-accent-blue-2 mr-2">✔️</span> Estudantes, professores e curiosos em geral
            </li>
            <li className="flex items-start bg-white/5 p-3 rounded-lg border border-white/10">
              <span className="text-accent-blue-2 mr-2">✔️</span> Empreendedores e gestores para otimizar processos
            </li>
          </ul>
        </section>

        <section className="border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">📍 Conclusão</h2>
          <p>
            O FreeonTools é mais do que um simples catálogo de utilitários — é uma solução prática e gratuita para propósito geral. Ele concentra ferramentas úteis que ajudam a agilizar tarefas, economizar tempo e melhorar resultados, sem custos, sem instalação e sem barreiras.
          </p>
          <p className="font-bold text-accent-blue-2 mt-4">
            Quer transformar qualquer necessidade digital em uma ação instantânea? FreeonTools tem a ferramenta certa para isso.
          </p>
        </section>
      </GlassCard>
    </PageWrapper>
  );
};

export default AboutPage;
