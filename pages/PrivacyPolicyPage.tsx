
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageWrapper
      title="Política de Privacidade"
      description="Entenda como lidamos com seus dados e nossa política de privacidade."
    >
      <GlassCard className="text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h2>1. Princípio Fundamental</h2>
        <p>Nossa principal política de privacidade é simples: todas as ferramentas neste site funcionam 100% no seu navegador (client-side). Isso significa que nenhum dado, arquivo ou informação que você insere ou processa é enviado para nossos servidores. Tudo acontece no seu próprio dispositivo.</p>
        
        <h2>2. Coleta de Informações</h2>
        <p>Não coletamos informações de identificação pessoal. Como não há upload de dados para nossos servidores, não temos acesso a nenhum dos conteúdos que você processa usando nossas ferramentas.</p>

        <h2>3. Cookies</h2>
        <p>Podemos usar cookies para melhorar a experiência do usuário, como salvar preferências de tema (claro/escuro). Não usamos cookies para rastreamento ou publicidade.</p>

        <h2>4. Ferramentas de Análise</h2>
        <p>Podemos usar ferramentas de análise anônimas (como o Google Analytics) para entender como os visitantes usam nosso site. Esses dados são agregados e não podem ser usados para identificar usuários individuais. As informações coletadas podem incluir tipo de navegador, sistema operacional e páginas visitadas, para nos ajudar a melhorar o serviço.</p>

        <h2>5. Links de Terceiros</h2>
        <p>Nosso site pode conter links para outros sites. Não somos responsáveis pelas práticas de privacidade desses outros sites. Encorajamos os usuários a estarem cientes quando saem do nosso site e a ler as declarações de privacidade de cada site que coleta informações de identificação pessoal.</p>
        
        <h2>6. Alterações a esta Política</h2>
        <p>Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Aconselhamos que você revise esta página periodicamente para quaisquer alterações.</p>
        
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
      </GlassCard>
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;
