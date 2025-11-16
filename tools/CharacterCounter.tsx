import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import { Type, Clipboard, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const withSpaces = text.length;
    const withoutSpaces = text.replace(/\s/g, '').length;
    return { withSpaces, withoutSpaces };
  }, [text]);

  const handlePasteFromClipboard = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setText(clip);
    } catch (err) {
      console.error('Erro ao acessar a área de transferência:', err);
    }
  };

  const handleClearText = () => setText('');

  return (
    <PageWrapper
      title="Contador de Caracteres"
      description="Descubra o número exato de caracteres em seu texto, com e sem espaços, em tempo real."
    >
      <GlassCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-primary-dark/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-accent-blue-2">{stats.withSpaces}</div>
                <div className="text-sm text-gray-400">Caracteres (com espaços)</div>
            </div>
            <div className="bg-primary-dark/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-accent-blue-2">{stats.withoutSpaces}</div>
                <div className="text-sm text-gray-400">Caracteres (sem espaços)</div>
            </div>
        </div>
        <style>{`
          .custom-scroll::-webkit-scrollbar { width: 12px; }
          .custom-scroll::-webkit-scrollbar-track { background: inherit; }
          .custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.06); border-radius: 999px; border: 3px solid transparent; background-clip: padding-box; }
          .custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.06) transparent; }
        `}</style>
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite ou cole seu texto aqui..."
            className="custom-scroll w-full h-64 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue-2 focus:border-accent-blue-2 sm:text-sm resize-y"
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <Button variant="secondary" size="sm" onClick={handlePasteFromClipboard} icon={<Clipboard size={14} />} />
            <Button variant="secondary" size="sm" onClick={handleClearText} icon={<Trash2 size={14} />} />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <Type size={24} className="text-accent-blue-2" />
          Analisador de Texto Preciso
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Saiba exatamente quantos caracteres seu texto possui. A ferramenta oferece contagem em tempo real, incluindo e excluindo espaços, para máxima precisão.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Essencial para posts no Twitter, meta descrições de SEO e SMS.</li>
          <li>Contagem dupla (com e sem espaços) para diferentes necessidades.</li>
          <li>Resultados instantâneos, sem atrasos ou necessidade de clicar em botões.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Contador de Caracteres?</h3>
        <p>
          O **Contador de Caracteres** é uma ferramenta que mede o comprimento de um texto, contando cada letra, número, símbolo e espaço. Ele é crucial para situações onde existe um **limite estrito de caracteres**, como em muitas plataformas de redes sociais e em contextos técnicos como SEO.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          A ferramenta funciona de maneira muito direta. Cada vez que você digita ou cola um texto, um script lê o conteúdo e mede seu comprimento total.
        </p>
        <ul className="list-disc list-inside space-y-2">
            <li>**Contagem com espaços:** É o comprimento total do texto, exatamente como está.</li>
            <li>**Contagem sem espaços:** Antes de contar, o script remove todos os espaços, tabulações e quebras de linha para dar um número que representa apenas o "conteúdo" visível.</li>
        </ul>
        <p>
          A atualização é em tempo real, o que permite um controle preciso durante a escrita.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Otimização para Redes Sociais:</strong> Crie posts perfeitos para o Twitter (agora X), Instagram, e LinkedIn, respeitando os limites de cada um.</li>
          <li><strong>Melhora o SEO:</strong> Escreva títulos e meta descrições com o comprimento ideal para que não sejam cortados nos resultados de busca do Google.</li>
          <li><strong>Precisão em Comunicação:</strong> Garanta que suas mensagens de SMS não ultrapassem o limite padrão e gerem custos extras.</li>
          <li><strong>Eficiência:</strong> Evita o trabalho manual de contar caracteres e previne erros.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          É indispensável sempre que você estiver escrevendo para uma plataforma com um limite definido:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Ao redigir um tweet.</li>
          <li>Ao escrever o título e a descrição de uma página para SEO.</li>
          <li>Ao criar o assunto de um e-mail para evitar que seja cortado.</li>
          <li>Ao preencher campos de formulário que possuem um número máximo de caracteres.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Profissionais de SEO:** Ajustam as meta descrições para ficarem abaixo de 160 caracteres, garantindo a exibição completa no Google.</li>
            <li>**Social Media Managers:** Planejam posts para o Twitter, certificando-se de que a mensagem principal caiba no limite e que as hashtags não sejam cortadas.</li>
            <li>**Estudantes:** Respondem a perguntas em plataformas de EAD que têm um limite de caracteres por resposta.</li>
        </ul>
      </GlassCard>

    </PageWrapper>
  );
};

export default CharacterCounter;