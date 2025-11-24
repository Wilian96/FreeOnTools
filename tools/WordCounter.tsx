import React, { useState, useMemo } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import { Pilcrow, Clipboard, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [ignoreEmptyLines, setIgnoreEmptyLines] = useState(true);

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    if (trimmedText === '') {
      return { words: 0, lines: 0 };
    }
    const words = trimmedText.split(/\s+/).filter(Boolean).length;
    // Count lines robustly (supports CRLF/LF/CR).
    // If `ignoreEmptyLines` is true, filter out lines that are only whitespace.
    const allParts = text.split(/\r\n|\r|\n/);
    const lines = allParts.length === 1 && allParts[0] === '' ? 0 : (
      ignoreEmptyLines ? allParts.filter(line => line.trim() !== '').length : allParts.length
    );
    return { words, lines };
  }, [text, ignoreEmptyLines]);

  const handlePasteFromClipboard = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setText(clip);
    } catch (err) {
      // fallback: do nothing (clipboard API may be blocked)
      console.error('Erro ao acessar a área de transferência:', err);
    }
  };

  const handleClearText = () => setText('');

  return (
    <PageWrapper
      title="Contador de Palavras e Linhas"
      description="Cole ou digite seu texto abaixo para obter uma contagem instantânea do número de palavras e linhas."
      schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Extrator de Cores Online",
        "description": "Cole ou digite seu texto abaixo para obter uma contagem instantânea do número de palavras e linhas.",
        "applicationCategory": "Utility",
        "operatingSystem": "All",
        "url": "https://free-on-tools.vercel.app/#/contador-de-palavras"
      }}
    >
      {/* H1 SEO */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold text-accent-blue-2">
          Contador de Palavras e Linhas
        </h1>
      </section>

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
        <div className="flex items-center justify-end gap-3 mb-3 text-sm text-gray-300">
          <label className="inline-flex items-center cursor-pointer select-none">
            <div
              role="switch"
              aria-checked={ignoreEmptyLines}
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIgnoreEmptyLines(v => !v); } }}
              onClick={() => setIgnoreEmptyLines(v => !v)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${ignoreEmptyLines ? 'bg-accent-blue-2' : 'bg-primary-dark/50 border border-primary-light/20'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${ignoreEmptyLines ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="ml-3">Ignorar linhas vazias</span>
          </label>
        </div>
        <style>{`
          /* Custom scrollbar for textarea: track uses the element background (inherit), thumb slightly lighter for contrast */
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

      <div className="mt-8 text-gray-400 text-sm">
        Esta ferramenta de Contador de Palavras funciona diretamente no seu navegador, sem enviar nenhum dado para servidores externos. Compatível com textos longos e caracteres especiais.
      </div>

    </PageWrapper>
  );
};

export default WordCounter;