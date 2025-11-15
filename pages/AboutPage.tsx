
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';

const AboutPage: React.FC = () => {
  return (
    <PageWrapper
      title="Sobre Nós"
      description="Conheça a missão por trás do nosso conjunto de ferramentas online gratuitas."
    >
      <GlassCard className="text-gray-300 space-y-4 leading-relaxed">
        <p>
          Bem-vindo ao nosso site de Ferramentas Online! Nascemos da necessidade de ter acesso rápido e fácil a utilitários comuns do dia a dia, sem a complicação de instalar softwares ou se preocupar com a privacidade dos dados.
        </p>
        <p>
          Nossa missão é fornecer uma plataforma centralizada com ferramentas que funcionam inteiramente no seu navegador (client-side). Isso significa que quando você usa uma de nossas ferramentas, como o compressor de imagens ou o gerador de senhas, todos os cálculos e manipulações são feitos diretamente no seu dispositivo. Nenhum dado, arquivo ou informação pessoal é enviado para nossos servidores.
        </p>
        <h3 className="text-2xl font-bold text-white pt-4">Nossos Princípios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Privacidade em Primeiro Lugar:</strong> Sua segurança é nossa prioridade. O processamento local garante que seus dados permaneçam seus.</li>
          <li><strong>Simplicidade e Eficiência:</strong> Criamos interfaces limpas e intuitivas para que você possa realizar suas tarefas sem esforço.</li>
          <li><strong>Acesso Gratuito:</strong> Acreditamos que ferramentas úteis devem ser acessíveis a todos, sem custos ou assinaturas.</li>
          <li><strong>Tecnologia Moderna:</strong> Utilizamos tecnologias web modernas para garantir uma experiência rápida, responsiva e agradável em qualquer dispositivo.</li>
        </ul>
        <p>
          Esperamos que você encontre nossas ferramentas úteis. Estamos sempre buscando melhorar e adicionar novos utilitários. Se tiver alguma sugestão, não hesite em nos contatar!
        </p>
      </GlassCard>
    </PageWrapper>
  );
};

export default AboutPage;
