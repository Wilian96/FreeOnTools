
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';

const TermsOfUsePage: React.FC = () => {
  return (
    <PageWrapper
      title="Termos de Uso"
      description="Leia os termos e condições para utilizar nosso site."
    >
      <GlassCard className="text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h2>1. Aceitação dos Termos</h2>
        <p>Ao acessar e usar este site, você aceita e concorda em ficar vinculado pelos termos e disposições deste acordo. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.</p>
        
        <h2>2. Uso das Ferramentas</h2>
        <p>As ferramentas fornecidas neste site são para seu uso pessoal e não comercial. Você concorda em não usar as ferramentas para quaisquer fins ilegais ou não autorizados.</p>
        <p>Você é o único responsável pelo conteúdo que processa através de nossas ferramentas. Como todas as operações são realizadas no lado do cliente, não temos acesso, controle ou responsabilidade sobre seus dados.</p>

        <h2>3. Isenção de Garantia</h2>
        <p>As ferramentas neste site são fornecidas "como estão". Não oferecemos garantias, expressas ou implícitas, e por este meio isentamos e negamos todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
        <p>Além disso, não garantimos nem fazemos qualquer representação sobre a precisão, os resultados prováveis ou a confiabilidade do uso das ferramentas em seu site ou de outra forma relacionado a tais materiais ou em quaisquer sites vinculados a este site.</p>

        <h2>4. Limitação de Responsabilidade</h2>
        <p>Em nenhum caso seremos responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar as ferramentas em nosso site, mesmo que nós ou um representante autorizado tenhamos sido notificados oralmente ou por escrito da possibilidade de tais danos.</p>
        
        <h2>5. Modificações dos Termos</h2>
        <p>Podemos revisar estes termos de uso para seu site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado pela versão atual destes termos de uso.</p>
        
        <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
      </GlassCard>
    </PageWrapper>
  );
};

export default TermsOfUsePage;
