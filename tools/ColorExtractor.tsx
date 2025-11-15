import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import { UploadCloud, Copy, Check, Palette } from 'lucide-react';

const ColorExtractor: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido.');
        return;
      }
      setIsLoading(true);
      setError(null);
      setDominantColor(null);

      const url = URL.createObjectURL(file);
      setImageUrl(url);

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        if (!canvasRef.current) {
            setIsLoading(false);
            return;
        }
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const colorCount: { [key: string]: number } = {};

        for (let i = 0; i < data.length; i += 4) {
          const rgb = `rgb(${data[i]}, ${data[i + 1]}, ${data[i + 2]})`;
          colorCount[rgb] = (colorCount[rgb] || 0) + 1;
        }

        const dominant = Object.keys(colorCount).reduce((a, b) => colorCount[a] > colorCount[b] ? a : b);
        
        const rgbValues = dominant.match(/\d+/g);
        if (rgbValues) {
            const hex = "#" + (+rgbValues[0]).toString(16).padStart(2, '0') + (+rgbValues[1]).toString(16).padStart(2, '0') + (+rgbValues[2]).toString(16).padStart(2, '0');
            setDominantColor(hex);
        }
        setIsLoading(false);
      };
      img.onerror = () => {
        setError('Não foi possível carregar a imagem. Tente outra.');
        setIsLoading(false);
      }
      img.src = url;
    }
  };

  const copyToClipboard = () => {
    if(!dominantColor) return;
    navigator.clipboard.writeText(dominantColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageWrapper
      title="Extrator de Cores"
      description="Descubra a cor predominante em qualquer imagem. Faça o upload e obtenha o código HEX da cor dominante instantaneamente."
    >
      <GlassCard>
        <div className="flex flex-col items-center">
          <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="image-upload" className="w-full max-w-md cursor-pointer bg-primary-dark/50 border-2 border-dashed border-primary-light/30 rounded-lg p-8 text-center hover:border-accent-blue-2 transition-colors">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-primary-light">Clique para selecionar uma imagem</span>
          </label>
        </div>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {isLoading && <p className="text-center mt-4">Analisando imagem...</p>}
        
        <div className="mt-8 flex flex-col md:flex-row gap-8 items-center justify-center">
            {imageUrl && (
                <div className="w-full md:w-1/2">
                    <img src={imageUrl} alt="Uploaded preview" className="rounded-lg shadow-lg max-h-80 mx-auto" />
                </div>
            )}
            {dominantColor && (
                <div className="w-full md:w-1/2 flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4" style={{ backgroundColor: dominantColor }}></div>
                    <div className="flex items-center gap-2 p-3 bg-primary-dark/50 rounded-md">
                        <span className="text-lg font-mono text-white">{dominantColor}</span>
                         <button onClick={copyToClipboard} className="text-primary-light hover:text-white transition-colors">
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </div>
        
        <canvas ref={canvasRef} className="hidden"></canvas>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <Palette size={24} className="text-accent-blue-2" />
          Descubra a Paleta de Cores
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Faça o upload de qualquer imagem e nossa ferramenta identificará a cor mais presente nela, fornecendo o código HEX para você usar em seus projetos.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Inspiração instantânea para paletas de cores.</li>
          <li>Perfeito para designers, desenvolvedores e artistas.</li>
          <li>Obtenha o código HEX exato com um clique para copiar.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Extrator de Cores?</h3>
        <p>
          O <strong>Extrator de Cores</strong> é uma ferramenta de análise de imagem que identifica a cor mais comum ou <em>dominante</em> em uma foto. É como ter um conta-gotas superpoderoso que, em vez de pegar a cor de um único pixel, analisa a imagem inteira e informa qual cor tem a maior presença.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
            O processo de extração de cores é fascinante e ocorre inteiramente no seu navegador, garantindo total privacidade. Quando você seleciona uma imagem, a ferramenta realiza os seguintes passos em milissegundos:
        </p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>
                <strong>Carregamento no Canvas:</strong> Sua imagem é desenhada em um elemento HTML5 <code>&lt;canvas&gt;</code>, que funciona como uma tela de pintura digital invisível para o usuário.
            </li>
            <li>
                <strong>Análise de Pixels:</strong> A ferramenta então lê os dados de cada pixel individualmente. Cada pixel contém informações de cor no formato RGB (Vermelho, Verde, Azul).
            </li>
            <li>
                <strong>Contagem de Frequência:</strong> Um algoritmo inteligente percorre todos os pixels e cria um "mapa" de cores, contando quantas vezes cada cor única aparece na imagem.
            </li>
            <li>
                <strong>Identificação da Cor Dominante:</strong> Após analisar todos os pixels, a cor que apareceu com maior frequência é declarada como a cor <em>dominante</em>.
            </li>
            <li>
                <strong>Conversão para HEX:</strong> Para facilitar sua vida, a cor dominante (geralmente em formato RGB) é convertida para o código <strong>HEX</strong> (ex: #0353a4), que é o padrão universal para web design e pode ser copiado e colado diretamente em seu código ou software de design.
            </li>
        </ol>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Criação de Paletas Coerentes:</strong> Use a cor dominante de uma foto como base para criar uma paleta de cores harmoniosa para um design.</li>
          <li><strong>Inspiração Rápida:</strong> Não sabe que cor usar? Inspire-se nas cores de uma imagem que você gosta.</li>
          <li><strong>Precisão Técnica:</strong> Obtenha o código exato de uma cor sem precisar adivinhar ou usar ferramentas complexas.</li>
          <li><strong>Eficiência:</strong> É a maneira mais rápida de "roubar" uma cor de uma imagem para usar em outro lugar.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          Esta ferramenta é incrivelmente útil para qualquer pessoa que trabalhe com elementos visuais:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Ao criar um site e querer que os botões combinem com a foto principal.</li>
          <li>Ao desenvolver uma apresentação e precisar de cores para os slides que harmonizem com o logo da empresa.</li>
          <li>Ao pintar uma parede e querer usar a cor exata de um objeto em uma foto de referência.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Web Designers:** Extraem a cor principal do logo de um cliente para usar como a cor de destaque no site.</li>
            <li>**Artistas Digitais:** Capturam a cor de um pôr do sol em uma foto para usar em suas ilustrações.</li>
            <li>**Decoradores de Interiores:** Identificam o tom exato de um móvel em uma revista para procurar uma tinta de parede correspondente.</li>
        </ul>
      </GlassCard>

    </PageWrapper>
  );
};

export default ColorExtractor;