
import React from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  const SUPPORT_EMAIL = 'development.work.main@gmail.com';
  const openMailClient = () => {
    try {
      window.location.href = `mailto:${SUPPORT_EMAIL}`;
    } catch (err) {
      console.error('Erro ao abrir cliente de e-mail:', err);
      // nada mais a fazer — o cliente pode não permitir programaticamente abrir
    }
  };

  return (
    <PageWrapper
      title="Contato"
      description="Tem alguma dúvida, sugestão ou feedback? Entre em contato conosco."
    >
      <GlassCard>
        <div className="py-6">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white">Contato</h3>
            <p className="text-gray-300">Se preferir, envie-nos um e-mail. Clique no botão abaixo para abrir seu cliente de e-mail com o destinatário preenchido.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={openMailClient} className="w-full sm:w-auto">
              Enviar e-mail para suporte
            </Button>
            <div className="flex-1 text-sm text-gray-300 self-center">Suporte: <span className="font-medium">{SUPPORT_EMAIL}</span></div>
          </div>
        </div>
      </GlassCard>
    </PageWrapper>
  );
};

export default ContactPage;
