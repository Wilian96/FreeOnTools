import React, { useState, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { UploadCloud, Download, FileImage } from 'lucide-react';

const PngToJpgConverter: React.FC = () => {
  const [pngFile, setPngFile] = useState<File | null>(null);
  const [pngUrl, setPngUrl] = useState<string | null>(null);
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/png') {
        setError('Por favor, selecione um arquivo no formato PNG.');
        return;
      }
      setPngFile(file);
      setPngUrl(URL.createObjectURL(file));
      setJpgUrl(null);
      setError(null);
      convertToJpg(file);
    }
  };

  const convertToJpg = (file: File) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setJpgUrl(dataUrl);
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <PageWrapper
      title="Conversor PNG para JPG"
      description="Converta facilmente suas imagens PNG para o formato JPG. O fundo transparente será preenchido com branco."
      canonicalUrl="https://freeontools.com.br/#/converter-png-para-jpg"
      ogImage="https://freeontools.com.br/og-image.png" 
      schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Extrator de Cores Online",
        "description": "Descubra a cor predominante em qualquer imagem. Faça o upload e obtenha o código HEX da cor dominante instantaneamente.",
        "applicationCategory": "Utility",
        "operatingSystem": "All",
        "url": "https://freeontools.com.br/#/converter-png-para-jpg"
      }}
    >
      {/* H1 SEO */}
      <section className="text-center mb-10">
        <h1 className="text-2xl font-bold text-accent-blue-2">
          Conversor PNG para JPG
        </h1>
      </section>

      <GlassCard>
        <div className="flex flex-col items-center">
          <input type="file" id="image-upload" className="hidden" accept="image/png" onChange={handleFileChange} />
          <label htmlFor="image-upload" className="w-full max-w-md cursor-pointer bg-primary-dark/50 border-2 border-dashed border-primary-light/30 rounded-lg p-8 text-center hover:border-accent-blue-2 transition-colors">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-primary-light">Clique para selecionar uma imagem PNG</span>
          </label>
        </div>
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        
        {pngUrl && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Imagem PNG Original</h3>
              <img src={pngUrl} alt="Original PNG" className="rounded-lg max-h-80 mx-auto shadow-md" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-2">Imagem JPG Convertida</h3>
              {jpgUrl ? (
                <div>
                  <img src={jpgUrl} alt="Converted JPG" className="rounded-lg max-h-80 mx-auto shadow-md" />
                   <a href={jpgUrl} download={`${pngFile?.name.replace(/\.png$/, '')}.jpg`}>
                    <Button className="mt-4" icon={<Download size={16}/>}>
                      Baixar JPG
                    </Button>
                  </a>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500">Convertendo...</div>
              )}
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden"></canvas>
      </GlassCard>

      <GlassCard className="mt-12">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
          <FileImage size={24} className="text-accent-blue-2" />
          Conversão de Formatos de Imagem
        </h3>
        <p className="text-gray-300">
          <strong className="text-primary-light">Descrição curta:</strong> Transforme suas imagens do formato PNG para JPG com facilidade. Ideal para reduzir o tamanho do arquivo ou quando a transparência não é necessária.
        </p>
        <p className="mt-3 text-gray-300"><strong className="text-primary-light">Destaques:</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
          <li>Conversão automática e instantânea após o upload.</li>
          <li>Fundo transparente de PNGs é preenchido com branco por padrão.</li>
          <li>Gera arquivos JPG de alta qualidade, ótimos para fotos.</li>
        </ul>
      </GlassCard>

      <GlassCard className="mt-8 text-gray-300 space-y-4 prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
        <h3 className="text-2xl font-bold text-white">O que é o Conversor PNG para JPG?</h3>
        <p>
          Esta ferramenta permite que você mude o formato de um arquivo de imagem de **PNG (Portable Network Graphics)** para **JPG (Joint Photographic Experts Group)**. Cada formato tem suas próprias características, e a conversão é útil quando as propriedades do JPG são mais adequadas para a sua necessidade.
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Como funciona</h3>
        <p>
          O processo acontece inteiramente no seu navegador:
        </p>
        <ol className="list-decimal list-inside space-y-2">
            <li>A imagem PNG é carregada em um canvas (uma área de desenho digital).</li>
            <li>Como o formato JPG não suporta transparência, a ferramenta primeiro preenche o fundo do canvas com a cor branca.</li>
            <li>A imagem PNG é desenhada por cima desse fundo branco.</li>
            <li>Finalmente, o resultado é exportado como um novo arquivo no formato JPG, pronto para ser baixado.</li>
        </ol>

        <h3 className="text-2xl font-bold text-white pt-4">Benefícios</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Redução de Tamanho:</strong> Arquivos JPG são geralmente menores que PNGs, especialmente para fotografias, o que é ótimo para a web.</li>
          <li><strong>Compatibilidade:</strong> Embora ambos os formatos sejam populares, alguns sistemas ou plataformas mais antigas podem ter melhor compatibilidade com JPG.</li>
          <li><strong>Simplicidade:</strong> Converte a imagem com um clique, sem precisar de softwares de edição complexos como o Photoshop.</li>
          <li><strong>Manuseio de Transparência:</strong> Elimina a necessidade de lidar com fundos transparentes quando eles não são desejados.</li>
        </ul>

        <h3 className="text-2xl font-bold text-white pt-4">Quando usar</h3>
        <p>
          A conversão de PNG para JPG é mais indicada para:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>**Fotografias:** O JPG é otimizado para imagens com muitas cores e gradientes, como fotos.</li>
          <li>**Otimização Web:** Quando o tamanho do arquivo é mais importante que a transparência.</li>
          <li>**Impressão:** Muitos serviços de impressão preferem ou exigem o formato JPG.</li>
        </ul>
        <p>
          <em>Evite converter logotipos ou imagens com texto e linhas nítidas, pois o PNG geralmente preserva melhor esses detalhes.</em>
        </p>

        <h3 className="text-2xl font-bold text-white pt-4">Exemplos práticos</h3>
        <ul>
            <li>**Fotógrafos:** Convertem suas fotos salvas em PNG para JPG para facilitar o compartilhamento e a publicação online.</li>
            <li>**Qualquer Usuário:** Precisa enviar uma imagem para um formulário que só aceita JPG.</li>
            <li>**Gerentes de Marketing:** Convertem materiais gráficos para criar versões mais leves para campanhas de e-mail marketing.</li>
        </ul>
      </GlassCard>
      
      <div className="mt-8 text-gray-400 text-sm">
        Esta ferramenta de Converter PNG para JPG funciona diretamente no seu navegador, sem enviar nenhum dado para servidores externos. Compatível com imagens de alta resolução.
      </div>

      {/* JSON-LD — ESSENCIAL PARA SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Removedor de Acentos",
          "applicationCategory": "Utility",
          "operatingSystem": "Web",
          "url": "https://freeontools.com.br/#/converter-png-para-jpg",
          "description":
            "Ferramenta online gratuita para converter imagens PNG em JPG diretamente no navegador, preservando a qualidade.",
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

export default PngToJpgConverter;