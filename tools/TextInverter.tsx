import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Repeat, Clipboard, Trash2, Copy, Check } from 'lucide-react';

const TextInverter: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const invertText = () => {
    const result = inputText.split('').reverse().join('');
    setOutputText(result);
  };

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Erro ao acessar a área de transferência:', err);
    }
  };

  const handleClearInput = () => setInputText('');

  const handleClearOutput = () => setOutputText('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência:', err);
    }
  };

  return (
    <PageWrapper
      title="Inversor de Texto"
      description="Escreva qualquer coisa e veja a mágica acontecer! Esta ferramenta inverte seu texto letra por letra."
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
            <label className="block text-sm font-medium text-primary-light mb-1">Seu Texto</label>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Digite algo para inverter..."
                className="custom-scroll w-full h-32 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue-2 resize-y"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={handlePasteInput} icon={<Clipboard size={14} />} />
                <Button variant="secondary" size="sm" onClick={handleClearInput} icon={<Trash2 size={14} />} />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={invertText}>Inverter Texto</Button>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-light mb-1">Texto Invertido</label>
            <div className="relative">
              <textarea
                readOnly
                value={outputText}
                placeholder="otxeT oditrevinI"
                className="custom-scroll w-full h-32 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-sm p-4 text-white focus:outline-none resize-y"
              />
              <div className="absolute right-2 top-2 flex gap-2">
                <Button variant="secondary" size="sm" onClick={copyToClipboard} icon={copied ? <Check size={14} /> : <Copy size={14} />} />
                <Button variant="secondary" size="sm" onClick={handleClearOutput} icon={<Trash2 size={14} />} />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <Repeat size={24} className="text-accent-blue-2" />
          Ferramenta de Inversão de Texto
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Uma ferramenta simples e divertida para virar qualquer texto de trás para frente. Escreva "Olá Mundo" e leia "odnuM álO" instantaneamente.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Ótimo para criar mensagens divertidas ou codificadas.</li>
          <li>Útil em programação para reverter a ordem de caracteres (strings).</li>
          <li>Resultado imediato e fácil de copiar.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Inversor de Texto?</h3>
        <p>
          O **Inversor de Texto** é um utilitário que reverte a ordem de todos os caracteres em uma dada string de texto. Ele lê o texto da direita para a esquerda e o reescreve, criando um efeito de espelho. É uma ferramenta tanto lúdica quanto funcional.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          O processo é puramente mecânico e baseado em três passos simples que o computador executa em um piscar de olhos:
        </p>
        <ol className="list-decimal list-inside space-y-2">
            <li>**Dividir:** O texto original é quebrado em uma lista de caracteres individuais. Ex: "gato" vira `['g', 'a', 't', 'o']`.</li>
            <li>**Inverter:** A ordem dessa lista é completamente invertida. Ex: `['g', 'a', 't', 'o']` vira `['o', 't', 'a', 'g']`.</li>
            <li>**Juntar:** Os caracteres na nova ordem são unidos novamente para formar o texto final. Ex: `['o', 't', 'a', 'g']` vira "otag".</li>
        </ol>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Diversão e Criatividade:</strong> Crie apelidos, mensagens secretas ou posts engraçados para redes sociais.</li>
          <li><strong>Ferramenta Educacional:</strong> Pode ser usado para explicar conceitos básicos de manipulação de strings em programação.</li>
          <li><strong>Uso Técnico:</strong> Desenvolvedores podem usar a ferramenta para verificar rapidamente o resultado de uma função de reversão de string sem precisar escrever código.</li>
          <li><strong>Simplicidade Absoluta:</strong> É uma das ferramentas mais diretas e fáceis de usar que existem.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          Embora pareça simples, o inversor de texto tem suas utilidades:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Para criar um efeito estilístico em textos ou nicks de jogos.</li>
          <li>Como um primeiro passo para criar palíndromos (palavras que se leem da mesma forma de trás para frente).</li>
          <li>Em desafios de programação ou quebra-cabeças lógicos.</li>
          <li>Simplesmente por curiosidade e diversão.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Usuários de Redes Sociais:** Invertem seus nomes ou frases de efeito no perfil para chamar a atenção.</li>
            <li>**Estudantes de Programação:** Testam a lógica de algoritmos de reversão comparando o resultado do seu código com o da ferramenta.</li>
            <li>**Amigos e Colegas:** Enviam mensagens codificadas de forma simples uns para os outros como uma brincadeira.</li>
        </ul>
      </GlassCard>

    </PageWrapper>
  );
};

export default TextInverter;