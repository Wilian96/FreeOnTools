import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
// FIX: The 'AspectRatio' icon does not exist in 'lucide-react'. Replaced it with the 'Expand' icon.
import { UploadCloud, Download, Image as ImageIcon, Expand } from 'lucide-react';

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
      if (originalWidth > 0) {
          const aspectRatio = originalHeight / originalWidth;
          setHeight(Math.round(newWidth * aspectRatio));
      }
  }

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHeight = parseInt(e.target.value, 10) || 0;
      setHeight(newHeight);
      if (originalHeight > 0) {
          const aspectRatio = originalWidth / originalHeight;
          setWidth(Math.round(newHeight * aspectRatio));
      }
  }


  return (
    <PageWrapper
      title="Redimensionar Imagem"
      description="Altere a largura e altura de suas imagens de forma rápida e proporcional. Faça o upload, defina as novas dimensões e baixe o resultado."
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
        {imageUrl && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap justify-center gap-4 items-center">
                <div>
                    <label htmlFor="width" className="block text-sm font-medium text-primary-light">Largura (px)</label>
                    <input type="number" id="width" value={width} onChange={handleWidthChange} className="mt-1 w-32 bg-primary-dark/50 border-primary-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-accent-blue-2 focus:border-accent-blue-2" />
                </div>
                <div className="self-end text-2xl text-gray-400 pb-2">×</div>
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-primary-light">Altura (px)</label>
                    <input type="number" id="height" value={height} onChange={handleHeightChange} className="mt-1 w-32 bg-primary-dark/50 border-primary-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-accent-blue-2 focus:border-accent-blue-2" />
                </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleResize} disabled={isResizing || !width || !height}>
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

    </PageWrapper>
  );
};

export default ImageResizer;