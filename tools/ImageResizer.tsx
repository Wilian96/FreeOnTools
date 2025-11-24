import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
// FIX: The 'AspectRatio' icon does not exist in 'lucide-react'. Replaced it with the 'Expand' icon.
import { UploadCloud, Download, Image as ImageIcon, Expand, ChevronUp, ChevronDown } from 'lucide-react';

const ImageResizer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [presetOpen, setPresetOpen] = useState(false);
  const [selectedPresetLabel, setSelectedPresetLabel] = useState<string | null>(null);
  const [linked, setLinked] = useState<boolean>(false);

  // Presets sorted from smallest to largest (by area)
  const presets = [
    { w: 512, h: 512 },
    { w: 800, h: 600 },
    { w: 1024, h: 768 },
    { w: 1280, h: 720 },
    { w: 1024, h: 1024 },
    { w: 1920, h: 1080 },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecione um arquivo de imagem válido.');
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setResizedUrl(null);
      setError(null);

      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
      };
      img.src = url;
    }
  };

  const handleResize = () => {
    if (!imageUrl || !canvasRef.current) return;
    setIsResizing(true);
    setError(null);
    // Prevent resizing to the same original dimensions
    if (originalWidth > 0 && originalHeight > 0 && width === originalWidth && height === originalHeight) {
      setError('As dimensões escolhidas são iguais às da imagem original. Selecione um tamanho diferente.');
      setIsResizing(false);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        setError('Não foi possível obter o contexto do canvas.');
        setIsResizing(false);
        return;
    }
    
    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL(imageFile?.type);
      setResizedUrl(dataUrl);
      setIsResizing(false);
    };
    img.onerror = () => {
        setError("Erro ao carregar a imagem para redimensionamento.");
        setIsResizing(false);
    }
    img.src = imageUrl;
  };
  
    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newWidth = parseInt(e.target.value, 10) || 0;
      setWidth(newWidth);
      if (linked) {
        setHeight(newWidth);
      }
    }

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeight = parseInt(e.target.value, 10) || 0;
      setHeight(newHeight);
      if (linked) {
        setWidth(newHeight);
      }
    }


  return (
    <PageWrapper
      title="Redimensionador de Imagens Online"
      description="Redimensione suas imagens facilmente. Ajuste largura e altura mantendo a proporção. Faça upload, defina o tamanho desejado e baixe a imagem redimensionada."
      schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Extrator de Cores Online",
        "description": "Descubra a cor predominante em qualquer imagem. Faça o upload e obtenha o código HEX da cor dominante instantaneamente.",
        "applicationCategory": "Utility",
        "operatingSystem": "All",
        "url": "https://free-on-tools.vercel.app/#/redimensionar-imagem"
      }}
    >
      {/* H1 SEO */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold text-accent-blue-2">
          Redimensionador de Imagens Online Gratuito
        </h1>
      </section>

      <GlassCard>
        <style>{`
          /* Hide native number input spinners while keeping functionality */
          .no-spinner::-webkit-outer-spin-button,
          .no-spinner::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .no-spinner {
            -moz-appearance: textfield;
          }
        `}</style>
        <div className="flex flex-col items-center">
          <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
          <label htmlFor="image-upload" className="w-full max-w-md cursor-pointer bg-primary-dark/50 border-2 border-dashed border-primary-light/30 rounded-lg p-8 text-center hover:border-accent-blue-2 transition-colors">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-primary-light">Clique para selecionar uma imagem</span>
          </label>
        </div>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {imageUrl && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap justify-center gap-4 items-center">
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-primary-light">Largura (px)</label>
                  <div className="relative mt-1">
                    <input
                      type="number"
                      id="width"
                      value={width}
                      onChange={handleWidthChange}
                      className="no-spinner w-32 pr-10 bg-primary-dark/50 border-primary-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-accent-blue-2 focus:border-accent-blue-2"
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col space-y-0.5">
                      <button
                        type="button"
                        aria-label="Aumentar largura"
                        onClick={() => setWidth(prev => {
                          const next = prev + 1;
                          if (linked) setHeight(next);
                          return next;
                        })}
                        className="w-6 h-6 flex items-center justify-center text-accent-blue-2 bg-transparent"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Diminuir largura"
                        onClick={() => setWidth(prev => {
                          const next = Math.max(0, prev - 1);
                          if (linked) setHeight(next);
                          return next;
                        })}
                        className="w-6 h-6 flex items-center justify-center text-accent-blue-2 bg-transparent"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="self-end text-2xl text-gray-400 pb-2">×</div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-primary-light">Altura (px)</label>
                  <div className="relative mt-1">
                    <input
                      type="number"
                      id="height"
                      value={height}
                      onChange={handleHeightChange}
                      className="no-spinner w-32 pr-10 bg-primary-dark/50 border-primary-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-accent-blue-2 focus:border-accent-blue-2"
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col space-y-0.5">
                      <button
                        type="button"
                        aria-label="Aumentar altura"
                        onClick={() => setHeight(prev => {
                          const next = prev + 1;
                          if (linked) setWidth(next);
                          return next;
                        })}
                        className="w-6 h-6 flex items-center justify-center text-accent-blue-2 bg-transparent"
                      >
                        <ChevronUp size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Diminuir altura"
                        onClick={() => setHeight(prev => {
                          const next = Math.max(0, prev - 1);
                          if (linked) setWidth(next);
                          return next;
                        })}
                        className="w-6 h-6 flex items-center justify-center text-accent-blue-2 bg-transparent"
                      >
                        <ChevronDown size={12} />
                      </button>
                    </div>
                  </div>
                </div>
            </div>

            {/* Preset sizes dropdown (custom to allow styled options) */}
            <div className="flex flex-wrap justify-center gap-3 items-center relative">
              <label className="text-sm text-gray-300 self-center mr-2">Tamanhos rápidos (px):</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setPresetOpen(prev => !prev)}
                  className="w-36 bg-primary-dark/50 border-primary-light/20 rounded-md shadow-sm py-1 px-3 text-white text-sm text-left flex items-center justify-between focus:outline-none focus:ring-accent-blue-2 focus:border-accent-blue-2"
                >
                  <span className="truncate">{selectedPresetLabel || 'Selecione um tamanho...'}</span>
                  <button type="button" aria-hidden className="ml-2 p-1 rounded bg-transparent">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-blue-2">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </button>

                {presetOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-primary-dark/50 border border-primary-light/20 rounded-md shadow-lg z-50">
                    {presets.map(p => (
                      <button
                        key={`${p.w}x${p.h}`}
                        type="button"
                        onClick={() => { setWidth(p.w); setHeight(p.h); setSelectedPresetLabel(`${p.w}×${p.h}`); setPresetOpen(false); }}
                        className="w-full text-left px-3 py-1 hover:bg-primary-dark/60 text-white text-sm"
                      >
                        {p.w}×{p.h}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-300 ml-4">
                <label className="inline-flex items-center cursor-pointer select-none">
                  <div
                    role="switch"
                    aria-checked={linked}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setLinked(v => !v); } }}
                    onClick={() => setLinked(v => !v)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${linked ? 'bg-accent-blue-2' : 'bg-primary-dark/50 border border-primary-light/20'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${linked ? 'translate-x-5' : 'translate-x-1'}`} />
                  </div>
                  <span className="ml-3">Vincular valores</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleResize}
                disabled={
                  isResizing || !width || !height || (originalWidth > 0 && originalHeight > 0 && width === originalWidth && height === originalHeight)
                }
              >
                {isResizing ? 'Redimensionando...' : 'Redimensionar'}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Original</h3>
                <img src={imageUrl} alt="Original" className="rounded-lg max-h-64 mx-auto shadow-md" />
                <p className="text-sm text-gray-400 mt-2">{originalWidth} x {originalHeight} px</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Redimensionada</h3>
                {isResizing && <div className="h-64 flex items-center justify-center"><ImageIcon className="h-10 w-10 animate-pulse text-gray-500"/></div>}
                {!isResizing && resizedUrl && <img src={resizedUrl} alt="Resized" className="rounded-lg max-h-64 mx-auto shadow-md" />}
                 {!isResizing && !resizedUrl && <div className="h-64 flex items-center justify-center text-gray-500">Aguardando redimensionamento</div>}
                {resizedUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">{width} x {height} px</p>
                    <a href={resizedUrl} download={`redimensionada_${imageFile?.name}`}>
                      <Button className="mt-4" icon={<Download size={16}/>}>
                        Baixar Imagem
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          {/* FIX: The 'AspectRatio' icon does not exist in 'lucide-react'. Replaced it with the 'Expand' icon. */}
          <Expand size={24} className="text-accent-blue-2" />
          Redimensionador de Imagens Preciso
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Altere as dimensões (largura e altura) de qualquer imagem para ajustá-la perfeitamente às suas necessidades. A ferramenta mantém a proporção para evitar distorções.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Cálculo automático da proporção para evitar imagens esticadas.</li>
          <li>Interface simples: basta inserir a largura ou altura desejada.</li>
          <li>Perfeito para fotos de perfil, banners e thumbnails.</li>
        </ul>
      </GlassCard>
      
      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Redimensionador de Imagens?</h3>
        <p>
          O **Redimensionador de Imagens** é uma ferramenta que permite alterar o tamanho físico (em pixels) de uma imagem. Diferente da compressão, que foca no tamanho do arquivo, o redimensionamento muda as *dimensões* de largura e altura da imagem.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          Ao fazer o upload de uma imagem, a ferramenta lê suas dimensões originais. Quando você digita uma nova largura ou altura, ela automaticamente calcula a outra dimensão para **manter a proporção original**, evitando que a imagem fique distorcida.
        </p>
        <p>
          Em seguida, um algoritmo de *interpolação* é usado para recriar a imagem com a nova quantidade de pixels, resultando em uma versão menor ou maior da original.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Adaptação Perfeita:</strong> Crie imagens com as dimensões exatas exigidas por redes sociais, plataformas de e-commerce ou sistemas de gerenciamento de conteúdo.</li>
          <li><strong>Consistência Visual:</strong> Garanta que todas as imagens em seu projeto (como fotos de produtos em um site) tenham o mesmo tamanho.</li>
          <li><strong>Redução de Tamanho de Arquivo:</strong> Diminuir as dimensões de uma imagem também reduz significativamente o tamanho do arquivo, o que é ótimo para a performance web.</li>
          <li><strong>Fácil de Usar:</strong> Não é preciso ter conhecimento técnico em edição de imagens para obter um resultado profissional.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          É ideal sempre que você precisar que uma imagem se encaixe em um espaço específico. Por exemplo:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Criar uma foto de perfil para o Instagram ou LinkedIn.</li>
          <li>Ajustar um banner para a capa do seu site.</li>
          <li>Preparar imagens de produtos para uma loja online.</li>
          <li>Criar thumbnails para vídeos do YouTube.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Social Media Managers:** Ajustam rapidamente as imagens para os formatos ideais de cada rede social (feed, stories, capa).</li>
            <li>**Web Designers:** Redimensionam imagens de clientes para caberem perfeitamente nos layouts que criaram.</li>
            <li>**Blogueiros:** Padronizam o tamanho das imagens de destaque de seus posts para manter o blog visualmente coeso.</li>
        </ul>
      </GlassCard>
      <div className="mt-8 text-gray-400 text-sm">
        Esta ferramenta de Redimensionador de Imagens funciona diretamente no seu navegador, sem enviar nenhum dado para servidores externos. Compatível com JPG, PNG, WEBP e GIF.
      </div>

    </PageWrapper>
  );
};

export default ImageResizer;