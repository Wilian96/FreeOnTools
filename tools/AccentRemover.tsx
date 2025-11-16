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
      title="Removedor de Acentos"
      description="Limpe seu texto removendo todos os acentos e diacríticos de forma rápida e fácil. Ideal para normalizar dados ou preparar texto para sistemas que não suportam acentuação."
    >
      <GlassCard>
        <style>{`
          .custom-scroll::-webkit-scrollbar { width: 12px; }
          .custom-scroll::-webkit-scrollbar-track { background: inherit; }
          .custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.06); border-radius: 999px; border: 3px solid transparent; background-clip: padding-box; }
          .custom-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.06) transparent; }
        `}</style>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-light mb-1">Texto Original</label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite o texto com acentos aqui..."
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
            <label className="block text-sm font-medium text-primary-light mb-1">Texto Sem Acentos</label>
            <div className="relative">
              <textarea
                readOnly
                value={outputText}
                placeholder="O resultado aparecerá aqui..."
                className="custom-scroll w-full h-40 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none resize-y"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={copyToClipboard} disabled={!outputText} icon={copied ? <Check size={14} /> : <Copy size={14} />} />
                <Button variant="secondary" size="sm" onClick={handleClearOutput} icon={<Trash2 size={14} />} />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <Combine size={24} className="text-accent-blue-2" />
          Normalizador de Texto
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Limpe e padronize seus textos removendo todos os tipos de acentos e diacríticos (´, `, ^, ~, ç) com um único clique.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Ideal para desenvolvedores e analistas de dados.</li>
          <li>Útil para criar URLs amigáveis (slugs) a partir de títulos.</li>
          <li>Processamento instantâneo e seguro no seu navegador.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Removedor de Acentos?</h3>
        <p>
          O **Removedor de Acentos** é uma ferramenta de processamento de texto que converte caracteres acentuados em suas versões equivalentes sem acento. Por exemplo, "olá, você está aí?" se torna "ola, voce esta ai?". Ele simplifica o texto para um conjunto de caracteres básicos.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          A ferramenta utiliza um método padrão do Unicode chamado **Normalização**. Especificamente, ela decompõe cada caractere em sua letra base e seu acento correspondente (por exemplo, "á" se torna "a" + "´"). Em seguida, ela simplesmente remove todos os caracteres de acento, deixando apenas as letras base.
        </p>
        <p>
          Este processo é extremamente rápido e eficiente, garantindo que todo o texto seja "limpo" de forma consistente.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Compatibilidade:</strong> Garante que o texto seja legível em sistemas ou softwares antigos que não suportam caracteres acentuados.</li>
          <li><strong>Padronização de Dados:</strong> Essencial para limpar bases de dados, onde "João" e "Joao" podem ser tratados como entradas diferentes.</li>
          <li><strong>SEO Técnico:</strong> Facilita a criação de URLs limpas e amigáveis (slugs) a partir de títulos de posts ou produtos.</li>
          <li><strong>Simplicidade:</strong> Resolve um problema técnico comum com uma interface extremamente simples e direta.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          Use esta ferramenta sempre que a acentuação puder causar problemas técnicos ou inconsistências:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Ao preencher formulários em sites estrangeiros.</li>
          <li>Antes de importar dados para um banco de dados ou planilha.</li>
          <li>Para criar um nome de arquivo a partir de um título.</li>
          <li>Ao programar, para garantir que as strings não causem erros de codificação.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Desenvolvedores:** Normalizam a entrada do usuário antes de salvá-la no banco de dados para evitar problemas de busca e ordenação.</li>
            <li>**Analistas de Dados:** Limpam colunas de texto em planilhas para garantir que a análise e a filtragem funcionem corretamente.</li>
            <li>**Gerentes de Conteúdo:** Convertem títulos como "Acentuação é Importante" para "acentuacao-e-importante" para usar na URL do post.</li>
        </ul>
      </GlassCard>

    </PageWrapper>
  );
};

export default AccentRemover;