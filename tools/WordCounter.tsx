import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import { Pilcrow } from 'lucide-react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') {
      return { words: 0, lines: 0 };
    }
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    const lines = text.split('\n').filter(line => line.trim() !== '').length;
    return { words, lines };
  }, [text]);

  return (
    <PageWrapper
      title="Contador de Palavras e Linhas"
      description="Cole ou digite seu texto abaixo para obter uma contagem instantânea do número de palavras e linhas."
    >
      <GlassCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-primary-dark/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-accent-blue-2">{stats.words}</div>
                <div className="text-sm text-gray-400">Palavras</div>
            </div>
            <div className="bg-primary-dark/50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-accent-blue-2">{stats.lines}</div>
                <div className="text-sm text-gray-400">Linhas</div>
            </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole seu texto aqui..."
          className="w-full h-64 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue-2 focus:border-accent-blue-2 sm:text-sm resize-y"
        />
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <Pilcrow size={24} className="text-accent-blue-2" />
          Contador de Palavras Inteligente
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Analise seus textos com precisão. Nossa ferramenta conta o número de palavras e linhas em tempo real, ajudando você a atingir metas e aprimorar sua escrita.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Contagem instantânea e precisa enquanto você digita.</li>
          <li>Ideal para estudantes, redatores, e profissionais de marketing.</li>
          <li>Interface limpa e sem distrações para focar no seu texto.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Contador de Palavras?</h3>
        <p>
          O **Contador de Palavras** é um utilitário digital que calcula automaticamente o número de palavras e linhas em um determinado texto. É uma ferramenta indispensável para quem trabalha com escrita e precisa seguir limites específicos de tamanho, como em redações, artigos, posts de redes sociais ou documentos profissionais.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          O funcionamento é simples e imediato. A ferramenta analisa o texto que você insere no campo e utiliza um algoritmo para identificar as palavras. Geralmente, uma "palavra" é definida como uma sequência de caracteres separada por *espaços* ou *quebras de linha*.
        </p>
        <p>
          Para a contagem de linhas, a ferramenta simplesmente identifica o número de quebras de linha (`\n`) no texto, ignorando linhas que estão completamente vazias para uma contagem mais precisa do conteúdo real.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Controle de Metas:</strong> Saiba exatamente se você atingiu o comprimento mínimo ou máximo exigido para um trabalho acadêmico, artigo de blog ou tweet.</li>
          <li><strong>Melhora a Concisão:</strong> Ao visualizar a contagem, você é incentivado a ser mais objetivo e a cortar palavras desnecessárias.</li>
          <li><strong>Produtividade:</strong> A contagem em tempo real permite que você ajuste seu texto durante a escrita, sem precisar parar para verificar o tamanho.</li>
          <li><strong>Análise Rápida:</strong> Cole qualquer texto e obtenha as métricas instantaneamente, sem necessidade de softwares complexos.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          Esta ferramenta é útil em inúmeras situações, como:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Escrever redações e trabalhos acadêmicos com limite de palavras.</li>
          <li>Criar posts para redes sociais que têm restrição de caracteres (indiretamente relacionado à contagem de palavras).</li>
          <li>Redigir artigos de SEO que precisam ter um comprimento específico.</li>
          <li>Verificar se um e-mail ou documento profissional está muito longo ou muito curto.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Estudantes:** Verificam se suas redações para o ENEM ou trabalhos de faculdade estão dentro dos limites exigidos.</li>
            <li>**Redatores e Jornalistas:** Controlam o tamanho de seus artigos para se adequarem aos espaços editoriais de jornais, revistas ou blogs.</li>
            <li>**Profissionais de Marketing:** Criam cópias para anúncios e posts que sejam curtos, impactantes e dentro das diretrizes da plataforma.</li>
        </ul>
      </GlassCard>

    </PageWrapper>
  );
};

export default WordCounter;