import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Copy, Check, Combine, Clipboard, Trash2 } from 'lucide-react';

const AccentRemover: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const removeAccents = () => {
    const result = inputText
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    setOutputText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasteInput = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setInputText(clip);
    } catch (err) {
      console.error('Erro ao acessar a área de transferência:', err);
    }
  };

  const handleClearInput = () => setInputText('');
  const handleClearOutput = () => setOutputText('');

  return (
    <PageWrapper
      title="Removedor de Acentos: Converter Texto Sem Acentuação Online"
      description="Remova acentos do texto online com rapidez e precisão. Converta palavras acentuadas para versões sem acentos. Ideal para SEO, dados, formulários e normalização de texto."
      canonicalUrl="https://freeontools.com.br/#/remover-acentos"
      ogImage="https://freeontools.com.br/#/remover-acentos/og/removedor-de-acentos.jpg"
      schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Removedor de Acentos",
        "description": "Ferramenta online gratuita para remover acentos do texto e gerar versões sem acentuação. Ideal para SEO, programação e análise de dados.",
        "applicationCategory": "Utility",
        "operatingSystem": "All",
        "url": "https://freeontools.com.br/#/remover-acentos"
      }}
    >

      {/* H1 SEO */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold text-accent-blue-2">
          Removedor de Acentos Online — Converter Texto Sem Acentuação
        </h1>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Transforme qualquer texto acentuado em sua versão sem acentos. Ferramenta ideal para SEO, padronização de dados, formulários, bancos de dados e criação de URLs amigáveis.
        </p>
      </section>

      <GlassCard>
        <style>{`
          .custom-scroll::-webkit-scrollbar { width: 12px; }
          .custom-scroll::-webkit-scrollbar-track { background: inherit; }
          .custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.06); border-radius: 999px; border: 3px solid transparent; background-clip: padding-box; }
          .custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.06) transparent; }
        `}</style>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-light mb-1">
              Texto Original (com acentos)
            </label>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite ou cole o texto com acentos aqui..."
                className="custom-scroll w-full h-40 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue-2 resize-y"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={handlePasteInput} icon={<Clipboard size={14} />} />
                <Button variant="secondary" size="sm" onClick={handleClearInput} icon={<Trash2 size={14} />} />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={removeAccents}>Remover Acentos</Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-light mb-1">
              Texto Sem Acentos
            </label>

            <div className="relative">
              <textarea
                readOnly
                value={outputText}
                placeholder="O texto sem acentos aparecerá aqui..."
                className="custom-scroll w-full h-40 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none resize-y"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!outputText}
                  icon={copied ? <Check size={14} /> : <Copy size={14} />}
                />
                <Button variant="secondary" size="sm" onClick={handleClearOutput} icon={<Trash2 size={14} />} />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* BLOCO SEO — CONTEÚDO OTIMIZADO */}
      <GlassCard className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <Combine size={24} className="text-accent-blue-2" />
          Normalizador de Texto Sem Acentuação
        </h2>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Remova todos os acentos do texto de forma rápida e automática. Ideal para SEO, formulários, bancos de dados e criação de slugs.
        </p>

        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Principais destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Perfeito para desenvolvedores e analistas de dados.</li>
          <li>Útil para gerar URLs amigáveis (slugs).</li>
          <li>Processamento local: nenhum dado é enviado para servidores.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-white">O que é o Removedor de Acentos?</h2>
        <p>
          O Removedor de Acentos é uma ferramenta que converte automaticamente caracteres acentuados
          em versões simples sem acentuação. Exemplo: "coração" → "coracao".  
          Esse processo ajuda a normalizar textos e evitar problemas em sistemas que não suportam caracteres especiais.
        </p>

        <h2 className="text-2xl font-bold text-white pt-4">Como funciona?</h2>
        <p>
          A ferramenta usa o método **Unicode Normalization Form D (NFD)**. Ele separa o caractere base do acento e remove apenas a parte acentuada, mantendo a letra original.
        </p>

        <h2 className="text-2xl font-bold text-white pt-4">Benefícios do texto sem acentos</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Compatibilidade:</strong> Ideal para sistemas antigos.</li>
          <li><strong>Padronização:</strong> Evita duplicidade em bases de dados.</li>
          <li><strong>SEO:</strong> Gera slugs limpos e URLs perfeitas.</li>
          <li><strong>Programação:</strong> Evita erros de codificação.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white pt-4">Quando usar?</h2>
        <p>Use sempre que a acentuação for um risco técnico:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Ao preencher formulários internacionais.</li>
          <li>Ao importar dados para planilhas ou sistemas.</li>
          <li>Ao gerar nomes de arquivos ou URLs.</li>
          <li>Ao programar para evitar conflitos de caracteres.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h2>
        <ul className="list-disc list-inside">
          <li><strong>Dev:</strong> Normaliza entradas do usuário.</li>
          <li><strong>Data Analyst:</strong> Facilita limpeza de dados.</li>
          <li><strong>SEO/Marketing:</strong> Cria slugs perfeitos.</li>
        </ul>
      </GlassCard>

      <div className="mt-8 text-gray-400 text-sm">
        Esta ferramenta de Remover Acentos funciona diretamente no seu navegador, sem enviar nenhum dado para servidores externos. Compatível com textos longos e caracteres especiais.
      </div>

      {/* JSON-LD — ESSENCIAL PARA SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Removedor de Acentos",
          "applicationCategory": "Utility",
          "operatingSystem": "Web",
          "url": "https://freeontools.com.br/#/remover-acentos",
          "description":
            "Ferramenta online gratuita para remover acentos do texto e gerar versões sem acentuação. Ideal para SEO, programação e análise de dados.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        })}
      </script>

    </PageWrapper>
  );
};

export default AccentRemover;
